"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  install: boolean;
  installPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, install: boolean) => void;
  setQty: (slug: string, install: boolean, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "mt_cart_v1";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(load());
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug && i.install === item.install);
      if (found) {
        return prev.map((i) =>
          i.slug === item.slug && i.install === item.install ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, install: boolean) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.install === install)));
  }, []);

  const setQty = useCallback((slug: string, install: boolean, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.install === install))
        : prev.map((i) => (i.slug === slug && i.install === install ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    for (const i of items) {
      c += i.qty;
      t += (i.price + (i.install ? i.installPrice : 0)) * i.qty;
    }
    return { count: c, total: t };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, total, add, remove, setQty, clear, open, setOpen }),
    [items, count, total, add, remove, setQty, clear, open]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}