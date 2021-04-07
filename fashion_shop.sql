-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2021 at 06:51 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashion_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `manv` int(10) NOT NULL,
  `admin` varchar(100) DEFAULT NULL,
  `matkhau` varchar(15) DEFAULT NULL,
  `tennv` varchar(50) NOT NULL,
  `diachi` varchar(100) NOT NULL,
  `sodienthoai` varchar(11) NOT NULL,
  `maquyen` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`manv`, `admin`, `matkhau`, `tennv`, `diachi`, `sodienthoai`, `maquyen`) VALUES
(1, 'admin@gmail.com', '123456', 'Admin', '155 PNT q8', '098564715', 1),
(3, 'nhhy@gmail.com', '123456', 'Yen Nhan', '15/2 HHH q1', '098547136', 2),
(4, 'mhth@gmail.com', '123456', 'Mong Ha Trung Huyen', '11 TTT q11', '0906548444', 2),
(5, NULL, NULL, 'Tran Van Ka', '196 TVH q9', '098564123', 3),
(6, NULL, NULL, 'Ho Van Cuong', '152 HQL q6', '0965753304', 3);

-- --------------------------------------------------------

--
-- Table structure for table `chitietdh`
--

CREATE TABLE `chitietdh` (
  `ma` varchar(50) CHARACTER SET utf8 NOT NULL,
  `mact` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `tensp` varchar(250) CHARACTER SET utf8 NOT NULL,
  `gia` int(10) NOT NULL,
  `soluong` int(11) NOT NULL,
  `madonhang` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `madm` varchar(50) NOT NULL,
  `tendm` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`madm`, `tendm`) VALUES
('DMA', 'Áo'),
('DMPK', 'Phụ kiện'),
('DMQ', 'Quần');

-- --------------------------------------------------------

--
-- Table structure for table `dm-loai`
--

CREATE TABLE `dm-loai` (
  `ma` int(10) NOT NULL,
  `madm` varchar(50) NOT NULL,
  `maloai` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `madonhang` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `makh` int(10) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gia` int(10) NOT NULL,
  `ma` varchar(50) NOT NULL,
  `ngaydat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ngaygiao` date DEFAULT NULL,
  `trangthai` int(11) NOT NULL DEFAULT 0,
  `manv` int(11) DEFAULT NULL,
  `manvgh` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `magiohang` int(10) NOT NULL,
  `masp` int(10) NOT NULL,
  `tensp` varchar(250) NOT NULL,
  `hinh` varchar(50) NOT NULL,
  `gia` int(10) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `makh` int(10) NOT NULL,
  `tenkh` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `matkhau` varchar(20) NOT NULL,
  `sodienthoai` varchar(20) NOT NULL,
  `diachi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`makh`, `tenkh`, `email`, `matkhau`, `sodienthoai`, `diachi`) VALUES
(1, 'Nguyễn Văn Nhất', 'nvn@gmail.com', '123456', '069741120', '15 HTK p5 q8'),
(2, 'Đông Văn Hưng', 'dvh@gmail.com', '123456', '069743365', '15 afg q6 q8'),
(3, 'Phan Thiện Nghĩa', 'ptn@gmail.com', '123456', '09575333', '156 acf p5 q8');

-- --------------------------------------------------------

--
-- Table structure for table `loaisp`
--

CREATE TABLE `loaisp` (
  `maloai` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tenloai` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `madm` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loaisp`
--

INSERT INTO `loaisp` (`maloai`, `tenloai`, `madm`) VALUES
('ak', 'ÁO KHOÁC', NULL),
('asm', 'ÁO SƠ MI', NULL),
('at', 'ÁO THUN', NULL),
('bl', 'BALO - TÚI SÁCH', NULL),
('dep', 'DÉP', NULL),
('giay', 'GIÀY', NULL),
('no', 'NÓN', NULL),
('qj', 'QUẦN JEAN', NULL),
('qk', 'QUẦN KAKI', NULL),
('qs', 'QUẦN SHORT', NULL),
('qt', 'QUẦN TÂY', NULL),
('tl', 'THẮT LƯNG', NULL),
('vo', 'VỚ', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhasx`
--

CREATE TABLE `nhasx` (
  `mansx` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tennsx` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `xuatxu` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhasx`
--

INSERT INTO `nhasx` (`mansx`, `tennsx`, `xuatxu`) VALUES
('ad', 'ADIDAS', 'Đức'),
('bsk', 'BSK', 'Việt Nam'),
('bt', 'BOUTON', 'Việt Nam'),
('dk', 'DICKIES', 'Mỹ'),
('ic', 'ICON', 'Việt Nam'),
('lcs', 'LACOSTE', 'Pháp'),
('mc', 'MASCUS', 'Việt Nam'),
('mlb', 'MLB Korea', 'Hàn Quốc'),
('nba', 'NBA', 'Việt Nam'),
('nk', 'NIKE', 'Mỹ'),
('nm', 'NOMOUS', 'Việt Nam'),
('pm', 'PUMA', 'Đức'),
('sp', 'SUPREME', 'Mỹ'),
('tm', 'T.MAN', 'Việt Nam'),
('zr', 'ZARA', 'Tây Ban Nha');

-- --------------------------------------------------------

--
-- Table structure for table `quyen`
--

CREATE TABLE `quyen` (
  `maquyen` int(10) NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `quyen`
--

INSERT INTO `quyen` (`maquyen`, `Ten`) VALUES
(1, 'Admin'),
(2, 'Nhân viên bán hàng'),
(3, 'Nhân viên giao hàng');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(10) NOT NULL,
  `code` varchar(50) NOT NULL,
  `tensp` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gia` int(10) NOT NULL,
  `hinh` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mansx` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `maloai` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `code`, `tensp`, `gia`, `hinh`, `mansx`, `maloai`) VALUES
(35, 'SMBO0007-01', 'Áo sơmi BOUTON Caro Flannel', 350000, 'boutonCaro.jpg', 'bt', 'asm'),
(36, 'SMBO0016-01', 'Áo sơmi BOUTON Carp Printed', 300000, 'boutonCarp.jpg', 'bt', 'asm'),
(37, 'SMBO0013-01', 'Áo sơmi BOUTON Striped X Mickey', 350000, 'boutonMickey.jpg', 'bt', 'asm'),
(38, 'SMNO0042-02', 'Áo sơmi NOMOUS ESSENTIALS Greek', 320000, 'nomousEssentials.jpg', 'nm', 'asm'),
(39, 'SMMA0004-01', 'Áo sơmi MASCUS Slim', 300000, 'mascusSlim.jpg', 'mc', 'asm'),
(40, 'SMTN0006-01', 'Áo sơmi tay ngắn T.MAN Pattern', 280000, 'tmanPattern.jpg', 'tm', 'asm'),
(41, 'SMTN0003-01', 'Áo Sơmi tay ngắn T.MAN Slim', 280000, 'tmanSlim.jpg', 'tm', 'asm'),
(42, 'SMID0005-01', 'Áo sơmi ICON DENIM Slim', 300000, 'iconDenim.jpg', 'ic', 'asm'),
(47, 'ATBO0030-01', 'Áo thun BOUTON L.tunes Printed', 280000, 'boutonLTunes.jpg', 'bt', 'at'),
(48, 'ATBO0066-01', 'Áo thun BOUTON x MARVEL', 280000, 'boutonMarvel.jpg', 'bt', 'at'),
(49, 'ATBK0007-01', 'Áo thun BSK Furture-Ready', 250000, 'bskFurture.jpg', 'bsk', 'at'),
(50, 'ATBK0011-01', 'Áo thun BSK X GOKU Printed', 280000, 'bskGOKU.jpg', 'bsk', 'at'),
(51, 'ATNO0074-01', 'Áo thun NOMOUS ESSENTIALS P.nuts Family', 280000, 'nomousPNuts.jpg', 'nm', 'at'),
(52, 'ATNO0080-01', 'Áo thun NOMOUS ESSENTIALS Itachi', 280000, 'nomousItachi.jpg', 'nm', 'at'),
(53, 'ATNE0002-01', 'Áo Thun N.B.A CHICAGO BULLS', 260000, 'nbaChicagoBulls.jpg', 'nba', 'at'),
(54, 'AKBO0017-01', 'Áo khoác denim BOUTON Panda', 550000, 'boutonPanda.jpg', 'bt', 'ak'),
(55, 'AKBO0015-01', 'Áo khoác BOUTON varsity jacket', 600000, 'boutonVarsity.jpg', 'bt', 'ak'),
(56, 'AKMLB190723-1', 'Áo khoác M.L.B N.Y hooded', 900000, 'mlbHooded.jpg', 'mlb', 'ak'),
(57, 'AKNO0023-01', 'Áo khoác kaki NOMOUS ESSENTIALS sticker', 380000, 'nomousSticker.jpg', 'nm', 'ak'),
(58, 'AKID9016-01', 'Áo khoác ICON DENIM caro', 380000, 'iconCaro.jpg', 'ic', 'ak'),
(59, 'TUID0001-01', 'Túi đeo ICON DENIM ss20', 580000, 'iconSS20.jpg', 'ic', 'bl'),
(60, 'TUML0004-01', 'Túi đeo chéo MLB Leather', 230000, 'mlbLeather.jpg', 'mlb', 'bl'),
(61, 'BAGPM190301-1', 'BALO PMA BACKPACK', 390000, 'pumaBP.jpg', 'pm', 'bl'),
(62, 'BAGSUP190928-1', 'Balo SUP.R ss19', 400000, 'supremeSS.jpg', 'sp', 'bl'),
(63, 'TUAD0010-01', 'TÚI ĐEO CHÉO ADIDAS', 250000, 'adidas.jpg', 'ad', 'bl'),
(64, 'DAB0020-01', 'DÉP ALPHABOUNCE - FULL ĐEN', 1250000, 'alphabounceD.jpg', 'ad', 'dep'),
(65, 'DAB0020-02', 'DÉP ALPHABOUNCE - ĐEN ĐẾ TRẮNG', 1250000, 'alphabounceTD.jpg', 'ad', 'dep'),
(66, 'DMLB0021-01', 'DÉP MLB - KEM', 650000, 'mlbKem.jpg', 'mlb', 'dep'),
(67, 'DMLB0022-01', 'DÉP MARVEL - XANH', 800000, 'mlbMarvel.jpg', 'mlb', 'dep'),
(68, 'DMLB0021-03', 'DÉP MLB X MICKEY BLACK', 1450000, 'mlbMickeyBlack.jpg', 'mlb', 'dep'),
(69, 'DMLB0021-04', 'DÉP MLB X MICKEY TRẮNG', 1450000, 'mlbMickeyWhite.jpg', 'mlb', 'dep'),
(70, 'DMLB0021-02', 'DÉP MLB - PINK', 650000, 'mlbPink.jpg', 'mlb', 'dep'),
(71, 'DNBA0030-01', 'Dép NBA Chicago Bulls', 450000, 'nbaChicago.jpg', 'nba', 'dep'),
(72, 'DPM0010-01', 'DÉP PUMA LEADCAT TRẮNG ĐEN', 850000, 'pumaLeadcatWB.jpg', 'pm', 'dep'),
(73, 'DPM0010-02', 'DÉP PUMA LEADCAT TRẮNG', 850000, 'pumaLeadcatWhite.jpg', 'pm', 'dep'),
(74, 'DPM0010-03', 'DÉP PUMA - XANH NGỌC', 550000, 'pumaTurquoise.jpg', 'pm', 'dep'),
(75, 'GNK0001-01', 'GIÀY NIKE AF1 SHADOW - ALL WHITE', 3400000, 'af1ShadowAW.jpg', 'nk', 'giay'),
(76, 'GNK0001-02', 'GIÀY JORDAN 1MID SE UNION BLACK TOE', 4800000, 'jordan1UBT.jpg', 'nk', 'giay'),
(77, 'GIC0002-01', 'Giày ICON DENIM Gray da lộn', 750000, 'iconGray.jpg', 'ic', 'giay'),
(78, 'GLC0003-01', 'Giày LACOSTE ss19', 900000, 'lacoste.jpg', 'lcs', 'giay'),
(79, 'GMB0004-01', 'GIÀY MLB BOSTON', 2100000, 'mlbBoston.jpg', 'mlb', 'giay'),
(80, 'GMB0004-02', 'GIÀY GIÀY MLB LA', 2100000, 'mlbLA.jpg', 'mlb', 'giay'),
(81, 'GMB0004-03', 'GIÀY GIÀY MLB New York', 2700000, 'mlbNY.jpg', 'mlb', 'giay'),
(82, 'GPM0005-01', 'GIÀY PUMA THUNDER', 2190000, 'pumathunder.jpg', 'pm', 'giay'),
(83, 'GAD0006-01', 'GIÀY ADIDAS STAN SMITH - GÓT ĐEN', 1850000, 'stansmith.jpg', 'ad', 'giay'),
(84, 'GAD0006-02', 'GIÀY ADIDAS SUPER STAR MICKEY', 2100000, 'superstartMickey.jpg', 'ad', 'giay'),
(85, 'NDK0001', 'Nón DICKIES', 180000, 'dickies.jpg', 'dk', 'no'),
(86, 'NHC0002', 'Nón Hoa Cúc', 180000, 'hoacuc.jpg', NULL, 'no'),
(87, 'NKZ0003', 'Nón Ken Zo', 230000, 'kenzo.jpg', NULL, 'no'),
(88, 'NMB0004', 'Nón MLB Trơn', 180000, 'mlb.jpg', 'mlb', 'no'),
(89, 'NMB0005', 'Nón MLB LA', 150000, 'mlbLA.jpg', 'mlb', 'no'),
(90, 'NMB0006', 'Nón MLB New York', 150000, 'mlbNY.jpg', 'mlb', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `trangthai`
--

CREATE TABLE `trangthai` (
  `tentt` varchar(20) CHARACTER SET utf8 NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trangthai`
--

INSERT INTO `trangthai` (`tentt`, `trangthai`) VALUES
('Đang chờ xử lý', 0),
('Đã duyệt', 1),
('Đang giao hàng', 2),
('Hoàn thành', 3),
('Đã hủy', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`manv`),
  ADD KEY `admin_ibfk_1` (`maquyen`);

--
-- Indexes for table `chitietdh`
--
ALTER TABLE `chitietdh`
  ADD PRIMARY KEY (`mact`),
  ADD KEY `madonhang` (`madonhang`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`madm`);

--
-- Indexes for table `dm-loai`
--
ALTER TABLE `dm-loai`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `dm-loai_ibfk_1` (`madm`),
  ADD KEY `dm-loai_ibfk_2` (`maloai`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`madonhang`),
  ADD KEY `makh` (`makh`),
  ADD KEY `masp` (`masp`),
  ADD KEY `maquyen` (`manv`),
  ADD KEY `manvgh` (`manvgh`),
  ADD KEY `trangthai` (`trangthai`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`magiohang`),
  ADD KEY `masp` (`masp`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`makh`);

--
-- Indexes for table `loaisp`
--
ALTER TABLE `loaisp`
  ADD PRIMARY KEY (`maloai`),
  ADD KEY `loaisp_ibfk_1` (`madm`);

--
-- Indexes for table `nhasx`
--
ALTER TABLE `nhasx`
  ADD PRIMARY KEY (`mansx`);

--
-- Indexes for table `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`maquyen`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `maloai` (`maloai`),
  ADD KEY `mansx` (`mansx`);

--
-- Indexes for table `trangthai`
--
ALTER TABLE `trangthai`
  ADD PRIMARY KEY (`trangthai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `manv` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chitietdh`
--
ALTER TABLE `chitietdh`
  MODIFY `mact` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `dm-loai`
--
ALTER TABLE `dm-loai`
  MODIFY `ma` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `madonhang` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `magiohang` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `makh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`maquyen`) REFERENCES `quyen` (`maquyen`) ON UPDATE CASCADE;

--
-- Constraints for table `chitietdh`
--
ALTER TABLE `chitietdh`
  ADD CONSTRAINT `chitietdh_ibfk_1` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`madonhang`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdh_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

--
-- Constraints for table `dm-loai`
--
ALTER TABLE `dm-loai`
  ADD CONSTRAINT `dm-loai_ibfk_1` FOREIGN KEY (`madm`) REFERENCES `danhmuc` (`madm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dm-loai_ibfk_2` FOREIGN KEY (`maloai`) REFERENCES `loaisp` (`maloai`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`manv`) REFERENCES `admin` (`manv`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_4` FOREIGN KEY (`manvgh`) REFERENCES `admin` (`manv`) ON UPDATE CASCADE,
  ADD CONSTRAINT `donhang_ibfk_5` FOREIGN KEY (`trangthai`) REFERENCES `trangthai` (`trangthai`) ON UPDATE CASCADE;

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON UPDATE CASCADE;

--
-- Constraints for table `loaisp`
--
ALTER TABLE `loaisp`
  ADD CONSTRAINT `loaisp_ibfk_1` FOREIGN KEY (`madm`) REFERENCES `danhmuc` (`madm`) ON UPDATE CASCADE;

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`maloai`) REFERENCES `loaisp` (`maloai`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`mansx`) REFERENCES `nhasx` (`mansx`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;