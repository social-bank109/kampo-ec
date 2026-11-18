import Link from "next/link";
import { DISCLOSURE } from "@/config/vista";

/** 自由診療・提供主体・標準治療・緊急時の共通開示（主要ページ下部） */
export default function DisclosureNotice() {
  return (
    <aside className="disclosure" aria-label="ご利用にあたっての重要事項">
      <div className="container container--narrow">
        <div className="disclosure__box">
          <p>{DISCLOSURE.service}</p>
          <p>{DISCLOSURE.standardCare}</p>
          <p>{DISCLOSURE.emergency}</p>
          <div className="disclosure__links">
            <Link className="text-link" href="/about/jiyu-shinryo">自由診療について</Link>
            <Link className="text-link" href="/legal/iryo-koukoku">医療広告ガイドラインに基づく表示</Link>
            <Link className="text-link" href="/legal/terms">利用規約</Link>
            <Link className="text-link" href="/legal/tokushoho">特定商取引法に基づく表記</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
