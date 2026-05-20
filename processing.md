# Processing — Onboarding DA Hà Nội

**Cập nhật:** 2026-05-20 (session 3)
**Task:** Tạo tài liệu bàn giao/onboarding cho DA mới — cụm kho Hà Nội

---

## Đã xong (session 2 — 2026-05-20)

- [x] Build HTML onboarding doc full-width 8 tab
- [x] Tab 1 Tổng quan: GHN overview → cụm HN, loại hàng, loại khách hàng, so sánh NinjaVan
- [x] Tab 2 Cụm kho HN: HN02 (1121) / DX (21513000) / HN03 (22487000) + BC HN & Bắc Ninh
- [x] Tab 3 Workflow: 7 loại request có branching steps + output + tools
- [x] Tab 4 Dataset: 5 nhóm bảng, schema chi tiết, gotcha, hướng dẫn xin quyền
- [x] Tab 5 Query Standards: dt type, timezone, ARRAY/UNNEST, window functions
- [x] Tab 6 Công cụ & Links: điền link thực tế cho tất cả tools
- [x] Tab 7 Đầu mối: 6 nhóm placeholder TBD
- [x] Tab 8 Checklist: 31 items actionable, link trực tiếp đến tools

### Link thực tế đã điền (Tab 6)
- Metabase: https://data-bi.ghn.vn/
- Superset SQL Lab: https://data-query.ghn.vn/sqllab/
- Looker Studio: https://lookerstudio.google.com/u/0/reporting/3fdec3ab-aa96-46d8-8a00-02ab9754e2e4/page/x1WWF/edit
- Grafana: https://grafana.ghn.vn/?orgId=1
- AI Portal / Data Job: https://risk-portal.ghn.vn/data_job/submit
- Nội bộ: https://noibo.ghn.vn/
- KTC Vận tải: https://nhanh.ghn.vn/ktc-van-tai
- Data Portal: https://data-portal.ghn.vn/
- Metabase Guideline doc: https://docs.google.com/document/d/1y3RHsM6lcUyJgMpeXjeUaczUSwcpUu2uBGYXJjgUfx0/edit?tab=t.0

---

## Còn lại / Chưa xong

- [x] **Đầu mối (tab 7):** Điền 9 liên hệ thực tế, 3 nhóm (Data/BI/OE, Ops, IT) — GTalk handles
- [x] **GTalk migration note (tab 7):** Thêm callout hướng dẫn cài GTalk + đăng nhập (gtalk.ghn.vn, mã NV + pw GHN app + OTP)
- [x] **Dashboard links cụm HN (tab 6):** 7 collection Metabase đã điền đầy đủ
- [x] **Data Job Guideline:** https://docs.google.com/document/d/1gUL9wixw23Vb9GGdybyoMHhah6gSnony25yhTB50ntk/edit
- [ ] **HN03 sort prefix:** Xác nhận với team Ops prefix của KTC Hà Nội 03 (22487000)
- [x] **DX clarification:** Không phải kho chuyển tiếp, hàng CK/nặng, không có CBS/băng chuyền
- [x] **HN03 location:** Đối diện HN02, cùng KCN Đài Tư — đã cập nhật vào warehouse card
- [x] **Leadtime "Chờ nhập":** Thêm mốc thứ 5: xe check-in → first package scan
- [x] **order_code vs package_code:** Thêm callout giải thích trong phần leadtime
- [x] **Workflow Bot:** Thêm Python/AppScript GGSheet → GTalk/Telegram; link tới GTalk Integration Guide
- [x] **Workflow Metabase:** 2 phương án (direct query nhẹ / AI Portal Job nặng)
- [x] **Workflow Google Docs:** Thêm hướng dẫn set quyền share bằng email @ghn.vn
- [x] **Workflow Analysis:** Cập nhật stakeholder-driven, output HTML hoặc Doc/PDF

---

## Quyết định quan trọng

- Scope cụm HN: HN02 + Dương Xá + HN03 + BC HN + BC Bắc Ninh. Không có Hưng Yên.
- HN03 = warehouse_id `22487000` (tìm từ dim_warehouse)
- Prefix C tại HN02 = hàng forward sang HY01 (không sort tại HN02) — verified T4/2026
- Tool stack: Metabase (BI) + Superset (ad-hoc) + Looker (share) + Grafana (monitor) + AI Portal (data job)
- Không có KPI thresholds — chỉ giữ định nghĩa

---

## Bước tiếp theo

1. Điền đầu mối (tab 7): tên + team + contact 6 nhóm
2. Lấy link 4 dashboard Metabase cụm HN điền vào tab 6 (phần dưới)
3. Điền link Data Job Guideline khi có
4. Xác nhận HN03 sort prefix với Ops

---

## File output

```
project/Onboarding_prj/html/onboarding/
├── index.html   ← Mở bằng browser
├── style.css
└── js/
    ├── constants.js
    ├── render.js
    └── init.js
```
