-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2021 at 02:23 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurants`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `imageurl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `imageurl`) VALUES
(1, 'Alto Coffee Cloud Cafe - พระอาทิตย์', 'ชา กาแฟ', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2XWTGMTLLCKFA/hero/222c096f40e04ffc89abd3a739b71562_1629432487024107221.jpg'),
(2, 'กรุงเกษมคาเฟ่ - ถนนกรุงเกษม', 'ชา กาแฟ', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2XHN26URVKVTE/hero/568801decb744ee7a8e8348d081ed5e0_1629163969892006394.jpeg'),
(3, 'Shinkanzen Sushi (ชินคันเซ็น ซูชิ) - GrabKitchen พาต้า', 'ซูชิ', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2EBGBLYVEJKCE/hero/e07e5202982e48478fa44f0e63ab557c_1630850467426571252.jpeg'),
(4, 'ป้าเพ็ญ อาหารตามสั่ง - ซอยจรัญสนิทวงศ์', 'อาหารตามสั่ง', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-CZNYMA4FTFJ3A2/hero/ac1ac32814f542d198c24856fd25db27_1599581259458666991.jpeg'),
(5, 'โกปี๊เฮี้ยะไถ่กี่ ณ ผ่านฟ้า', 'ชา กาแฟ', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2U1PFKKLVBHGJ/hero/ef1001db87cc48aeb88bc509ae8ba5e0_1626244131059372114.jpeg'),
(6, 'Oppa Daek ไก่ทอดเกาหลี - Grabkitchen พาต้า', 'Partner,  ไก่ทอด', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2EVG2JHAKBCFE/hero/af3de9706bea4a5893e548c3fb2d4fde_1630850467064531556.jpeg'),
(7, 'อ้อย ข้าวคลุกกะปิ - อรุณ​อัม​รินทร์', 'อาหารตามสั่ง', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-CZKTN2TYCTCEFA/hero/cb5b82ec7edb425daeabe9adf1fea062_1593683118171424592.jpeg'),
(8, 'Cafe Amazon (คาเฟ่ อเมซอน) - อาคารพาณิชย์ปิ่นเกล้า', 'ชา กาแฟ', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-CZKKA2XXFGABCX/hero/e943adae2d0b423eac08687beb15950f_1605672386584812340.jpg'),
(9, 'Starbucks (สตาร์บัคส์) - ไอดีโอโมบิ จรัญ อินเตอร์เชนจ์', 'ชา กาแฟ,  น้ำผลไม้/สมูทตี้', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/THGFIST00000282/hero/6e7208ccc2e948fdb7b96437faa40f78_1627318805407715503.png'),
(10, 'บุญเลิศ บะหมี่เกี๊ยวหมูย่างซีอิ๊ว สาขาต้นตำหรับ - ป้อมปราบฯ', 'อาหารเส้น', 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/3-C2W2V3XFAANAAA/hero/d6f1f66177464163a342b95390ae9d81_1627959237902559465.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `tel`) VALUES
(1, 'tanawit', 'tanawit@gmail.com', '0660022535'),
(2, 'chanakan02', 'chanakan', '0823039409'),
(3, 'user', 'chanakan.puthai@gmail.com', '0823039409'),
(4, 'thisguss', 'thisguss@gmail.com', '0931648766'),
(5, 'chotica123', 'chotika00@hotmail.com', '0941235067'),
(6, 'yothaka', 'yothaka11@gmail.com', '0881254367'),
(7, 'panupat', 'panu12@gmail.com', '0661549923'),
(8, 'somruethai', 'somsom@gmail.com', '0823034569'),
(9, 'guss123', 'gussjung@gmail.com', '0874562193');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
