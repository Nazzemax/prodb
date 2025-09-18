'use client';

import React, { JSX, useEffect, useState } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useAppData } from '@/context/app-context';

/**
 * Типы
 */
type Phone = {
  phone: string;
  [k: string]: any;
};

type AppData = {
  phones?: Phone[];
  [k: string]: any;
};

interface WhatsappPayload {
  href: string;
  phone: string;
  widget?: string;
  label?: string;
  timestamp?: number;
}

/**
 * Расширяем глобальный Window для TS
 */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    dataLayer?: Record<string, any>[];
    __whatsappTrack?: (p: WhatsappPayload) => void;
  }
}

/**
 * Компонент
 */
export default function FloatingWhatsapp(): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<string | null>(null);
  const { data } = useAppData() as { data?: AppData | null };

  useEffect(() => {
    setMounted(true);
    setLocale(() => {
      try {
        return localStorage.getItem('locale');
      } catch {
        return null;
      }
    });
  }, []);

  // Очередь событий, если fbq ещё не инициализирован
  useEffect(() => {
    const queue: WhatsappPayload[] = [];
    let timer: number | null = null;

    const flush = () => {
      // Если fbq доступен — отправляем стандартное событие Contact (лучше классифицируется)
      if (typeof window.fbq === 'function') {
        while (queue.length) {
          const p = queue.shift()!;
          const fbParams = toFBParams(p);
          try {
            // Используем стандартное имя события 'Contact'
            window.fbq('track', 'Contact', fbParams);
          } catch {
            // Если fbq упал — пушим в dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'Contact', ...fbParams });
          }
        }
      } else {
        // fbq всё ещё не доступен — пушим всё в dataLayer
        window.dataLayer = window.dataLayer || [];
        while (queue.length) {
          const p = queue.shift()!;
          window.dataLayer.push({ event: 'Contact', ...toFBParams(p) });
        }
      }
    };

    // Проверяем до 5 секунд наличие fbq, затем flush в dataLayer
    const startChecking = () => {
      const start = Date.now();
      timer = window.setInterval(() => {
        if (typeof window.fbq === 'function') {
          flush();
          if (timer !== null) {
            clearInterval(timer);
            timer = null;
          }
        } else if (Date.now() - start > 5000) {
          flush();
          if (timer !== null) {
            clearInterval(timer);
            timer = null;
          }
        }
      }, 250);
    };

    startChecking();

    // expose helper to push into queue externally if needed
    window.__whatsappTrack = (p: WhatsappPayload) => {
      queue.push(p);
    };

    return () => {
      if (timer !== null) clearInterval(timer);
      window.__whatsappTrack = undefined;
    };
  }, []);

  // Преобразование payload к параметрам Facebook
  const toFBParams = (p: WhatsappPayload) => {
    return {
      content_name: 'WhatsApp Button',
      content_type: 'button',
      action_source: 'website',
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      phone: p.phone,
      href: p.href,
      widget: p.widget ?? 'react-floating-whatsapp',
      label: p.label ?? 'floating_whatsapp',
      timestamp: p.timestamp ?? Date.now(),
    };
  };

  // Основной слушатель кликов
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const selectors = [
      'a[href*="wa.me"]',
      'a[href*="api.whatsapp.com"]',
      '.react-floating-whatsapp',
      '.floating-whatsapp',
      '.floating-whatsapp__button',
      '.faw-button',
      '.floating-whatsapp-button',
    ];

    const findWAElement = (e: Event): { el: HTMLElement; href: string } | null => {
      const ev = e as MouseEvent & { composedPath?: () => EventTarget[]; path?: EventTarget[] };
      const path = ev.composedPath ? ev.composedPath() : (ev.path || []);
      if (path && path.length) {
        for (const node of path) {
          try {
            if (!node || (node as any).nodeType !== 1) continue;
            const el = node as HTMLElement;
            if (el.tagName === 'A') {
              const href = (el as HTMLAnchorElement).href || el.getAttribute('href') || '';
              if (href.includes('wa.me') || href.includes('api.whatsapp.com')) return { el, href };
            }
            for (const cls of selectors.slice(2)) {
              if (el.classList && el.classList.contains(cls.replace('.', ''))) {
                const a = el.querySelector('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
                return { el: (a as HTMLElement) || el, href: (a ? (a as HTMLAnchorElement).href : '') };
              }
            }
            if (el.getAttribute && (el.getAttribute('data-whatsapp-href') || el.getAttribute('data-href'))) {
              const href = el.getAttribute('data-whatsapp-href') || el.getAttribute('data-href') || '';
              return { el, href };
            }
          } catch {
            // ignore cross-origin nodes
          }
        }
      }

      // fallback
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return null;
      for (const sel of selectors) {
        const found = target.closest(sel) as HTMLElement | null;
        if (found) {
          const href = (found as HTMLAnchorElement).href || found.getAttribute('href') || '';
          return { el: found, href };
        }
      }
      return null;
    };

    const sendEvent = (payload: WhatsappPayload) => {
      const fbParams = toFBParams(payload);
      // если fbq есть — отправляем стандартное событие Contact
      if (typeof window.fbq === 'function') {
        try {
          window.fbq('track', 'Contact', fbParams);
          return;
        } catch {
          // fallthrough -> dataLayer
        }
      }
      // fallback -> dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'Contact', ...fbParams });
    };

    const onClick = (e: Event) => {
      const me = e as MouseEvent;
      if (me.button && me.button !== 0) return;
      if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;

      const found = findWAElement(e);
      if (!found) return;

      const { el, href } = found;
      const phoneFromData =
        locale === 'uz'
          ? data?.phones?.[1]?.phone?.replace(/\s/g, '') ?? ''
          : data?.phones?.[0]?.phone?.replace(/\s/g, '') ?? '';

      const payload: WhatsappPayload = {
        href: href || 'unknown',
        phone: phoneFromData || 'unknown',
        widget: 'react-floating-whatsapp',
        label: 'floating_whatsapp',
        timestamp: Date.now(),
      };

      // если fbq недоступен и есть очередь helper
      if (typeof window.fbq !== 'function' && typeof window.__whatsappTrack === 'function') {
        window.__whatsappTrack(payload);
      } else {
        sendEvent(payload);
      }

      // предотвращаем прерывание отправки (открываем в новой вкладке, если нужно)
      try {
        const targetAttr = el.getAttribute && el.getAttribute('target');
        const isSameWindow = !targetAttr || targetAttr === '_self';
        if (href && isSameWindow) {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
          // небольшой буфер чтобы успело уйти
          setTimeout(() => {}, 150);
        }
      } catch {
        /* noop */
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [data, locale]);

  if (!mounted || !data) return null;

  const phoneNumber =
    (locale === 'uz' ? data?.phones?.[1]?.phone?.replace(/\s/g, '') : data?.phones?.[0]?.phone?.replace(/\s/g, '')) || '';

  return (
    <FloatingWhatsApp
      phoneNumber={phoneNumber}
      accountName="Bold Brands International"
      notificationSound
      chatMessage="Доброго времени суток, чем могу вам помочь?"
      statusMessage="Онлайн"
      darkMode
      avatar="https://bishkek.headhunter.kg/employer-logo/6266415.png"
      placeholder="Введите текст"
    />
  );
}
