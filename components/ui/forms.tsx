"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SubmitForm({
  action,
  children,
  successMessage = "提交成功，平台已生成演示记录。",
  buttonText = "提交",
  className
}: {
  action: string;
  children: React.ReactNode;
  successMessage?: string;
  buttonText?: string;
  className?: string;
}) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(action, {
      method: "POST",
      body: formData
    });
    const data = (await response.json()) as { message?: string; id?: string; orderNo?: string };
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message || "提交失败，请检查表单内容。");
      return;
    }
    form.reset();
    setMessage(data.message || (data.orderNo ? `${successMessage} 编号：${data.orderNo}` : successMessage));
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "提交中" : buttonText}
        </Button>
        {message ? <p className="text-sm font-medium text-blue-700">{message}</p> : null}
      </div>
    </form>
  );
}

export function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "min-h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
