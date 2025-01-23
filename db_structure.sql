-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2025 at 08:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enquiryform`
--
CREATE DATABASE IF NOT EXISTS `enquiryform` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `enquiryform`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account`
--

DROP TABLE IF EXISTS `tbl_account`;
CREATE TABLE IF NOT EXISTS `tbl_account` (
  `iAccountID` int(11) NOT NULL AUTO_INCREMENT,
  `vAccount` varchar(255) NOT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `iAdminID` int(11) NOT NULL AUTO_INCREMENT,
  `vFirstName` varchar(100) NOT NULL,
  `vLastName` varchar(100) NOT NULL,
  `vEmail` varchar(255) NOT NULL,
  `vPassword` varchar(255) NOT NULL,
  `iAddedBy` varchar(200) NOT NULL,
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `eRole` enum('Admin','Executive') NOT NULL,
  `isDelete` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `tsModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iAdminID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`iAdminID`, `vFirstName`, `vLastName`, `vEmail`, `vPassword`, `iAddedBy`, `eStatus`, `eRole`, `isDelete`, `dtCreated`, `tsModified`) VALUES
(1, 'Admin', 'User', 'admin@admin.com', 'admin', '1', 'Active', 'Admin', 'No', '2019-05-03 06:26:10', '2024-07-20 06:13:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_allotment`
--

DROP TABLE IF EXISTS `tbl_allotment`;
CREATE TABLE IF NOT EXISTS `tbl_allotment` (
  `iAllotID` int(11) NOT NULL AUTO_INCREMENT,
  `iEnquiryID` int(11) NOT NULL,
  `iExecutiveID` int(11) NOT NULL,
  `dtAsDate` date NOT NULL,
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`iAllotID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `iCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `vCategory` varchar(255) NOT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clientmaster`
--

DROP TABLE IF EXISTS `tbl_clientmaster`;
CREATE TABLE IF NOT EXISTS `tbl_clientmaster` (
  `iClientID` int(11) NOT NULL AUTO_INCREMENT,
  `vName` varchar(255) NOT NULL,
  `vMobileno` varchar(20) NOT NULL,
  `vEmail` varchar(255) DEFAULT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iClientID`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

DROP TABLE IF EXISTS `tbl_company`;
CREATE TABLE IF NOT EXISTS `tbl_company` (
  `iCompanyID` int(11) NOT NULL AUTO_INCREMENT,
  `vCompanyName` varchar(255) NOT NULL,
  `tAddress` text DEFAULT NULL,
  `vPhoneNo` varchar(20) NOT NULL,
  `vEmail` varchar(255) DEFAULT NULL,
  `vWebsiteName` varchar(255) DEFAULT NULL,
  `vGstNo` varchar(30) DEFAULT NULL,
  `vHsnCode` varchar(20) NOT NULL,
  `vImageName` varchar(255) DEFAULT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDelete` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iCompanyID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dcompany`
--

DROP TABLE IF EXISTS `tbl_dcompany`;
CREATE TABLE IF NOT EXISTS `tbl_dcompany` (
  `iDCompanyID` int(11) NOT NULL AUTO_INCREMENT,
  `vDCompanyName` varchar(255) NOT NULL,
  `tAddress` text DEFAULT NULL,
  `vPhoneno` varchar(20) DEFAULT NULL,
  `vEmail` varchar(255) DEFAULT NULL,
  `vGSTno` varchar(30) DEFAULT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iDCompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dealer`
--

DROP TABLE IF EXISTS `tbl_dealer`;
CREATE TABLE IF NOT EXISTS `tbl_dealer` (
  `iDealerID` int(11) NOT NULL AUTO_INCREMENT,
  `vDName` varchar(255) NOT NULL,
  `vDMobileno` varchar(20) DEFAULT NULL,
  `vDEmail` varchar(255) DEFAULT NULL,
  `vDGSTno` varchar(30) DEFAULT NULL,
  `vDCity` varchar(255) DEFAULT NULL,
  `iDCompanyID` int(11) NOT NULL DEFAULT 0,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vPassword` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`iDealerID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_efollowup`
--

DROP TABLE IF EXISTS `tbl_efollowup`;
CREATE TABLE IF NOT EXISTS `tbl_efollowup` (
  `iEFollowupID` int(11) NOT NULL AUTO_INCREMENT,
  `iEnquiryID` int(11) NOT NULL,
  `iAdminID` int(11) NOT NULL,
  `dtEFollowup` date NOT NULL,
  `vETime` varchar(50) NOT NULL,
  `tERemarks` text NOT NULL,
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iEFollowupID`)
) ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enquiry`
--

DROP TABLE IF EXISTS `tbl_enquiry`;
CREATE TABLE IF NOT EXISTS `tbl_enquiry` (
  `iEnquiryID` int(11) NOT NULL AUTO_INCREMENT,
  `dtJoin` date NOT NULL,
  `iExecutiveID` int(11) NOT NULL DEFAULT 0,
  `dtAsDate` date DEFAULT NULL,
  `iClientID` int(11) NOT NULL DEFAULT 0,
  `vMobileno` varchar(20) NOT NULL,
  `iAdminID` int(11) NOT NULL,
  `ePriority` enum('Open','Pending','Close','Reject') NOT NULL DEFAULT 'Open',
  `vEmail` varchar(255) DEFAULT NULL,
  `iReferbyID` int(11) NOT NULL DEFAULT 0,
  `vAddress` text DEFAULT NULL,
  `iProgramgroupID` int(11) NOT NULL DEFAULT 0,
  `iProgramID` int(11) NOT NULL DEFAULT 0,
  `fPackage` float NOT NULL DEFAULT 0,
  `fQuotation` float NOT NULL DEFAULT 0,
  `fCommission` float NOT NULL DEFAULT 0,
  `tPRemarks` text DEFAULT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iEnquiryID`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enrol`
--

DROP TABLE IF EXISTS `tbl_enrol`;
CREATE TABLE IF NOT EXISTS `tbl_enrol` (
  `iEnrolID` int(11) NOT NULL AUTO_INCREMENT,
  `eEnrol_Type` enum('Spot','Renewal','Upgrade') NOT NULL DEFAULT 'Spot',
  `iAdminID` int(11) NOT NULL,
  `iSpotID` int(11) NOT NULL,
  `dtJoin` date DEFAULT NULL,
  `fProgFees` float NOT NULL,
  `fQty` float NOT NULL,
  `fFeeswithouttax` float NOT NULL,
  `fTax` float NOT NULL,
  `vInvoice` varchar(255) NOT NULL,
  `vWInvoiceno` varchar(30) DEFAULT NULL,
  `vGInvoiceno` varchar(30) DEFAULT NULL,
  `vGSTno` varchar(16) DEFAULT NULL,
  `fFeesPayable` float NOT NULL,
  `fDue` float NOT NULL DEFAULT 0,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iEnrolID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_executive`
--

DROP TABLE IF EXISTS `tbl_executive`;
CREATE TABLE IF NOT EXISTS `tbl_executive` (
  `iExecutiveID` int(11) NOT NULL AUTO_INCREMENT,
  `vEFingerID` varchar(300) NOT NULL,
  `vEName` varchar(255) NOT NULL,
  `eEGender` enum('Male','Female') NOT NULL,
  `iDeptID` int(11) NOT NULL,
  `iDesignID` int(11) NOT NULL,
  `dtEJoin` date NOT NULL,
  `vEMobileno` varchar(12) NOT NULL,
  `vEHomeno` varchar(50) DEFAULT NULL,
  `vEmail` varchar(200) NOT NULL,
  `vPassword` varchar(255) NOT NULL,
  `eRole` enum('Executive') NOT NULL DEFAULT 'Executive',
  `dtEDOB` date DEFAULT NULL,
  `vEAddress` text DEFAULT NULL,
  `vECity` varchar(200) DEFAULT NULL,
  `vEDistrict` varchar(200) DEFAULT NULL,
  `vEState` varchar(200) DEFAULT NULL,
  `vEPincode` varchar(10) DEFAULT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`iExecutiveID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menrol`
--

DROP TABLE IF EXISTS `tbl_menrol`;
CREATE TABLE IF NOT EXISTS `tbl_menrol` (
  `iMEnrolID` int(11) NOT NULL AUTO_INCREMENT,
  `iEnrolID` int(11) NOT NULL,
  `iSpotID` int(11) NOT NULL,
  `iAdminID` int(11) NOT NULL,
  `dtStartingdate` date NOT NULL,
  `dtExpirydate` date NOT NULL,
  `iProgramgroupID` int(11) NOT NULL,
  `iProgramID` int(11) NOT NULL,
  `fvProgFees` float NOT NULL,
  `fvQty` float NOT NULL,
  `fvFeeswithouttax` float NOT NULL,
  `vTax` varchar(30) NOT NULL,
  `fvTax` float NOT NULL,
  `fvFeesPayable` float NOT NULL,
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iMEnrolID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
CREATE TABLE IF NOT EXISTS `tbl_message` (
  `iMessageID` int(11) NOT NULL AUTO_INCREMENT,
  `vTime` varchar(100) NOT NULL,
  `dtDate` date NOT NULL,
  `vType` varchar(60) NOT NULL,
  `vMessage` text NOT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iMessageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pagecontent`
--

DROP TABLE IF EXISTS `tbl_pagecontent`;
CREATE TABLE IF NOT EXISTS `tbl_pagecontent` (
  `iPageID` int(11) NOT NULL AUTO_INCREMENT,
  `vPageTitle` varchar(255) NOT NULL,
  `tMetaKeywords` text NOT NULL,
  `tMetaDescription` text NOT NULL,
  `tContent` text NOT NULL,
  `tCreatedAt` datetime NOT NULL,
  `tModifiedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iPageID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_party`
--

DROP TABLE IF EXISTS `tbl_party`;
CREATE TABLE IF NOT EXISTS `tbl_party` (
  `iPartyID` int(11) NOT NULL AUTO_INCREMENT,
  `vParty` varchar(255) NOT NULL,
  `tAddress` text DEFAULT NULL,
  `vCity` varchar(255) DEFAULT NULL,
  `vCName` varchar(255) DEFAULT NULL,
  `vCMobileno` varchar(20) DEFAULT NULL,
  `tCPhoneNo` text DEFAULT NULL,
  `vCEmail` varchar(255) DEFAULT NULL,
  `vCGstNo` varchar(50) DEFAULT NULL,
  `vWebsite` varchar(255) DEFAULT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iPartyID`)
) ENGINE=InnoDB AUTO_INCREMENT=855 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_periodmaster`
--

DROP TABLE IF EXISTS `tbl_periodmaster`;
CREATE TABLE IF NOT EXISTS `tbl_periodmaster` (
  `iPeriodID` int(11) NOT NULL AUTO_INCREMENT,
  `vType` varchar(100) NOT NULL,
  `iDays` int(11) NOT NULL,
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`iPeriodID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `iProductID` int(11) NOT NULL AUTO_INCREMENT,
  `iCategoryID` int(11) NOT NULL,
  `vProduct` varchar(255) NOT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=598 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_program`
--

DROP TABLE IF EXISTS `tbl_program`;
CREATE TABLE IF NOT EXISTS `tbl_program` (
  `iProgramID` int(11) NOT NULL AUTO_INCREMENT,
  `vProgram` varchar(120) NOT NULL,
  `iProgramgroupID` int(11) NOT NULL,
  `iPeriodID` int(11) NOT NULL,
  `iDays` int(11) NOT NULL,
  `fProgramFees` float NOT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`iProgramID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_programgroup`
--

DROP TABLE IF EXISTS `tbl_programgroup`;
CREATE TABLE IF NOT EXISTS `tbl_programgroup` (
  `iProgramgroupID` int(11) NOT NULL AUTO_INCREMENT,
  `vProgramgroup` varchar(120) NOT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`iProgramgroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_receipt`
--

DROP TABLE IF EXISTS `tbl_receipt`;
CREATE TABLE IF NOT EXISTS `tbl_receipt` (
  `iReceiptID` int(11) NOT NULL AUTO_INCREMENT,
  `vReceipt` enum('Cash','Cheque','Credit','Debit','Online') NOT NULL,
  `iEnrolID` int(11) NOT NULL,
  `iMemberID` int(11) NOT NULL,
  `vMember` varchar(40) NOT NULL,
  `vMobile` varchar(12) NOT NULL,
  `fPayment` float NOT NULL,
  `vReceiptno` varchar(300) NOT NULL,
  `dtPayment` date NOT NULL,
  `tPayment` varchar(40) NOT NULL,
  `eEnrol_Type` enum('C','R','U') NOT NULL,
  `iReceived` int(11) NOT NULL,
  `vCheq_deb_crno` varchar(70) DEFAULT NULL,
  `vBank_name` varchar(100) DEFAULT NULL,
  `dtCheque` date DEFAULT NULL,
  `vRemarks` text NOT NULL,
  `dtNext_Payment` date DEFAULT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iReceiptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_referby`
--

DROP TABLE IF EXISTS `tbl_referby`;
CREATE TABLE IF NOT EXISTS `tbl_referby` (
  `iReferbyID` int(11) NOT NULL AUTO_INCREMENT,
  `vRName` varchar(255) NOT NULL,
  `vRMobile` varchar(12) DEFAULT NULL,
  `vREmail` varchar(255) DEFAULT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iReferbyID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_renewal`
--

DROP TABLE IF EXISTS `tbl_renewal`;
CREATE TABLE IF NOT EXISTS `tbl_renewal` (
  `iRenewalID` int(11) NOT NULL AUTO_INCREMENT,
  `iAdminID` int(11) NOT NULL,
  `iCategoryID` int(11) NOT NULL DEFAULT 0,
  `iProductID` int(11) NOT NULL DEFAULT 0,
  `dtRegister` date NOT NULL,
  `dtExpiry` date NOT NULL,
  `iPartyID` int(11) NOT NULL DEFAULT 0,
  `iQty` int(11) NOT NULL DEFAULT 0,
  `dRate` double NOT NULL DEFAULT 0,
  `dAmount` double NOT NULL DEFAULT 0,
  `dTax` double NOT NULL DEFAULT 0,
  `eTaxType` enum('Exclusive','Inclusive') NOT NULL,
  `dTotalAmount` double NOT NULL DEFAULT 0,
  `iAccountID` int(11) NOT NULL DEFAULT 0,
  `iDealerID` int(11) NOT NULL DEFAULT 0,
  `tRemarks` text DEFAULT NULL,
  `eStatus` enum('Active','Deactive') NOT NULL DEFAULT 'Active',
  `vType` varchar(255) NOT NULL,
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vtbluser_ip` text DEFAULT NULL,
  `vtblrtouser_customerid` varchar(255) DEFAULT NULL,
  `vtblrtouser_databse` varchar(255) DEFAULT NULL,
  `vtblrtouser_server` varchar(255) DEFAULT NULL,
  `vtblrtouser_user` varchar(255) DEFAULT NULL,
  `vtblrtouser_password` varchar(255) DEFAULT NULL,
  `vtblrtouser_port` varchar(255) DEFAULT NULL,
  `itblrtouser_activestatuts` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`iRenewalID`)
) ENGINE=InnoDB AUTO_INCREMENT=1284 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_renewfollowup`
--

DROP TABLE IF EXISTS `tbl_renewfollowup`;
CREATE TABLE IF NOT EXISTS `tbl_renewfollowup` (
  `iFollowupID` int(11) NOT NULL AUTO_INCREMENT,
  `vTime` varchar(60) NOT NULL,
  `iEnrolID` int(11) NOT NULL,
  `iEmpID` int(11) NOT NULL,
  `iResponseID` int(11) NOT NULL,
  `dtFollowup` date NOT NULL,
  `dtNextfollowup` date NOT NULL,
  `eFollowup` enum('Renewal','Addon Upgrade') NOT NULL,
  `ePriority` enum('High','Medium','Low') NOT NULL,
  `vRemarks` varchar(1000) NOT NULL,
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`iFollowupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_response`
--

DROP TABLE IF EXISTS `tbl_response`;
CREATE TABLE IF NOT EXISTS `tbl_response` (
  `iResponseID` int(11) NOT NULL AUTO_INCREMENT,
  `vResponse` varchar(255) NOT NULL,
  PRIMARY KEY (`iResponseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_setting`
--

DROP TABLE IF EXISTS `tbl_setting`;
CREATE TABLE IF NOT EXISTS `tbl_setting` (
  `iSettingID` int(11) NOT NULL AUTO_INCREMENT,
  `vContactmail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `vCompanymail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tCreatedAt` datetime NOT NULL,
  `tModifiedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eStatus` enum('Active','Inactive') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`iSettingID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_spot`
--

DROP TABLE IF EXISTS `tbl_spot`;
CREATE TABLE IF NOT EXISTS `tbl_spot` (
  `iSpotID` int(11) NOT NULL AUTO_INCREMENT,
  `eEnrol_Type` enum('Enquiry','Spot') NOT NULL,
  `iEnquiryID` int(11) NOT NULL DEFAULT 0,
  `iAdminID` int(11) NOT NULL,
  `eType` enum('YS','YS-HUF','YS-LLP') DEFAULT NULL,
  `vName` varchar(255) NOT NULL,
  `vMobileno` varchar(15) NOT NULL,
  `vEmail` varchar(255) NOT NULL,
  `fQuotation` float NOT NULL,
  `fCommission` float NOT NULL,
  `dtJoin` date NOT NULL,
  `iReferbyID` int(11) DEFAULT NULL,
  `vPhoto` varchar(100) DEFAULT NULL,
  `vAddress` text NOT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iSpotID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stategst`
--

DROP TABLE IF EXISTS `tbl_stategst`;
CREATE TABLE IF NOT EXISTS `tbl_stategst` (
  `iStateID` int(11) NOT NULL AUTO_INCREMENT,
  `vState` varchar(100) NOT NULL,
  `vCode` varchar(11) NOT NULL,
  `dtModified_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iStateID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_systemexpiry`
--

DROP TABLE IF EXISTS `tbl_systemexpiry`;
CREATE TABLE IF NOT EXISTS `tbl_systemexpiry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `dtDelivery` date NOT NULL,
  `dtExpiry` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tax`
--

DROP TABLE IF EXISTS `tbl_tax`;
CREATE TABLE IF NOT EXISTS `tbl_tax` (
  `iTaxID` int(11) NOT NULL AUTO_INCREMENT,
  `vTax` varchar(200) NOT NULL,
  `fTax` float NOT NULL,
  `dtFrom` date NOT NULL,
  `dtTo` date NOT NULL,
  `eStatus` enum('active','inactive') NOT NULL DEFAULT 'active',
  `isDeleted` enum('Yes','No') NOT NULL DEFAULT 'No',
  `dtCreated_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dtModified_Date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`iTaxID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
