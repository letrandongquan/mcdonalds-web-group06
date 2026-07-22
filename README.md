# MCDONALD'S VIỆT NAM — WEBSITE ĐẶT MÓN TRỰC TUYẾN
> **Đồ án môn Công nghệ Web** | **Nhóm thực hiện:** Nhóm 06  
> **Năm thực hiện:** 2026 | **Dự án:** Thiết kế giao diện người dùng

---

## 📌 1. Giới thiệu dự án (Introduction)

Chào mừng bạn đến với dự án **"McDonald's Việt Nam"** — hệ thống website mô phỏng giao diện đặt món trực tuyến và giới thiệu sản phẩm cho chuỗi nhà hàng McDonald's.

### 🛠️ Công nghệ sử dụng
Dự án được phát triển hoàn toàn dựa trên các công nghệ Web nền tảng:
* **HTML5:** Cấu trúc trang web chuẩn SEO và semantic layout.
* **CSS3:** Thiết kế giao diện hiện đại, responsive hoàn toàn trên nhiều thiết bị.
* **Vanilla JS (JavaScript thuần):** Xử lý tương tác người dùng, hiệu ứng UI và mô phỏng giỏ hàng linh hoạt.

### 🎯 Mục tiêu dự án
* Xây dựng giao diện người dùng thân thiện, trực quan và hiện đại.
* Cung cấp trải nghiệm duyệt thực đơn, tra cứu khuyến mãi và xem thông tin hệ thống cửa hàng.
* Mô phỏng quy trình chọn món và tương tác với giỏ hàng thực tế.

---

## 💻 2. Yêu cầu hệ thống (System Requirements)

Để đảm bảo trang web hiển thị và hoạt động mượt mà nhất, thiết bị của người dùng cần đáp ứng các tiêu chuẩn sau:

| Tiêu chí | Trình duyệt / Môi trường hỗ trợ |
| :--- | :--- |
| **Trình duyệt Web** | Google Chrome (v110+), Microsoft Edge, Mozilla Firefox, Safari (phiên bản mới nhất) |
| **Kết nối mạng** | Kết nối Internet ổn định để tải hình ảnh, font chữ và bản đồ nhúng |
| **Hệ điều hành** | Hỗ trợ đa nền tảng: Windows, macOS, Linux, iOS, Android |

---

## 🌐 3. Địa chỉ truy cập (How to Access)

Website đã được xuất bản (deploy) hoàn tất trên môi trường **GitHub Pages**. Bạn có thể trải nghiệm trực tiếp qua đường dẫn công khai dưới đây:

🔗 **URL Website:** [https://letrandongquan.github.io/mcdonalds-web-group06/](https://letrandongquan.github.io/mcdonalds-web-group06/)

---

## ✨ 4. Tổng quan tính năng chính (Features Overview)

```
                     ┌─────────────────────────────────────────┐
                     │     HỆ THỐNG WEBSITE MCDONALD'S JS      │
                     └────────────────────┬────────────────────┘
                                          │
    ┌─────────────────┬───────────────────┼───────────────────┬─────────────────┐
    │                 │                   │                   │                 │
▼ Trang chủ       ▼ Thực đơn          ▼ Ưu đãi            ▼ Cửa hàng        ▼ Giỏ hàng
- Banner nổi bật  - Danh mục món ăn   - Gói Combo         - Tra cứu địa chỉ - Thêm/Xóa món
- Thống kê        - Chi tiết giá cả   - Khuyến mãi hot    - Bản đồ Google   - Tạm tính
```

### 📋 Chi tiết các trang & phân hệ:
1. **Trang chủ (Home):**
   * Giới thiệu tổng quan thương hiệu McDonald's Việt Nam.
   * Banner trình chiếu các sản phẩm nổi bật và các con số thống kê ấn tượng.
2. **Thực đơn (Menu):**
   * Hiển thị danh sách món ăn đa dạng: *Burger, Gà rán, Đồ uống, Bữa sáng & Tráng miệng*.
   * Đầy đủ hình ảnh, tên món và giá niêm yết rõ ràng.
3. **Gói Combo & Khuyến mãi:**
   * Tổng hợp các chương trình ưu đãi giảm giá hot.
   * Các gói combo tiết kiệm dành cho cá nhân và nhóm.
4. **Hệ thống cửa hàng (Store Locator):**
   * Danh sách địa chỉ các chi nhánh.
   * Tích hợp bản đồ **Google Maps** giúp tìm kiếm vị trí cửa hàng gần nhất.
5. **Giỏ hàng mô phỏng (Shopping Cart):**
   * Cho phép chọn món, tăng/giảm số lượng và tính tổng tiền theo thời gian thực.

---

## 📖 5. Hướng dẫn sử dụng từng bước (Step-by-Step Instructions)

### Step 1 ➔ Duyệt và xem thực đơn
> Nhấp vào mục **"Thực đơn"** trên thanh điều hướng (Navigation Bar). Kéo xuống để chọn danh mục mong muốn như *Burger, Gà rán, Đồ uống...*

### Step 2 ➔ Thêm món vào giỏ
> Tại mỗi thẻ món ăn hoặc gói combo, bấm vào nút **`+` (màu đỏ)** để thêm nhanh món đó vào giỏ hàng.

### Step 3 ➔ Kiểm tra giỏ hàng
> Nhấp vào **biểu tượng Xe đẩy** ở góc phải thanh menu (hoặc **nút giỏ hàng nổi** ở góc dưới bên phải màn hình) để mở bảng xem lại danh sách các món đã chọn.

### Step 4 ➔ Đặt hàng mô phỏng
> Bấm nút **"Đặt hàng"** để tiến hành kiểm tra đơn hàng. *(Lưu ý: Hiện tại tính năng đang dừng ở bước mô phỏng giao diện).*

---

## 🖼️ 6. Hình ảnh minh họa (Screenshots)

* **Hình 1:** Giao diện Trang chủ & Banner chính (`image_01.png`)
![Trang chủ](image_01.png)
* **Hình 2:** Danh sách Combo ưu đãi & Thực đơn (`image_02.png`)
![Danh sách Combo](image_02.png)
* **Hình 3:** Giao diện Giỏ hàng mô phỏng (`image_03.png`)
![Giỏ hàng mô phỏng](image_03.png)

---

## ⚠️ 7. Hạn chế hiện tại (Known Limitations)

* **Chưa có Backend & Database:** Hệ thống chưa tích hợp xử lý thanh toán thực tế và chưa lưu trữ dữ liệu vào cơ sở dữ liệu máy chủ.
* **Lưu trữ dữ liệu tạm thời:** Thông tin giỏ hàng hiện lưu trên bộ nhớ tạm của trang. Khi tải lại trang (F5), dữ liệu giỏ hàng sẽ làm mới về `0` (chưa áp dụng `LocalStorage` / `SessionStorage`).

---

## ✅ 8. Danh sách kiểm tra hoàn thành (Submission Checklist)

| STT | Hạng mục kiểm tra | Trạng thái |
| :-: | :--- | :-: |
| **1** | Website đã deploy lên GitHub Pages và truy cập ổn định bằng link công khai | **[PASSED]** |
| **2** | GitHub Repository đã được chuyển sang chế độ **Public** | **[PASSED]** |
| **3** | Tất cả liên kết (điều hướng, hình ảnh, tài nguyên CSS/JS) hoạt động tốt, không lỗi 404 | **[PASSED]** |
| **4** | Tài liệu hướng dẫn người dùng (User Guide / README) đầy đủ các mục theo yêu cầu | **[PASSED]** |
| **5** | Đã điền chính xác URL trang web vào mục *"Published Website URL"* khi nộp bài | **[PASSED]** |

---

<div align="center">

© 2026 **Nhóm 06** — Dự án Thiết kế giao diện người dùng  
*Trường Đại học Công nghệ / Khoa CNTT*

</div>
