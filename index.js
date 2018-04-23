const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const sql = require('mssql')



var timezone=[
  {
    "Abbr": "ACDT",
    "Name": "Australian Central Daylight Savings Time",
    "UTC offset": "UTC+10:30"
  },
  {
    "Abbr": "ACST",
    "Name": "Australian Central Standard Time",
    "UTC offset": "UTC+09:30"
  },
  {
    "Abbr": "ACT",
    "Name": "Acre Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "ACT",
    "Name": "ASEAN Common Time",
    "UTC offset": "UTC+06:30"
  },
  {
    "Abbr": "ACWST",
    "Name": "Australian Central Western Standard Time (unofficial)",
    "UTC offset": "UTC+08:45"
  },
  {
    "Abbr": "ADT",
    "Name": "Atlantic Daylight Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "AEDT",
    "Name": "Australian Eastern Daylight Savings Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "AEST",
    "Name": "Australian Eastern Standard Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "AFT",
    "Name": "Afghanistan Time",
    "UTC offset": "UTC+04:30"
  },
  {
    "Abbr": "AKDT",
    "Name": "Alaska Daylight Time",
    "UTC offset": "UTC−08"
  },
  {
    "Abbr": "AKST",
    "Name": "Alaska Standard Time",
    "UTC offset": "UTC−09"
  },
  {
    "Abbr": "AMST",
    "Name": "Amazon Summer Time (Brazil)[1]",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "AMT",
    "Name": "Amazon Time (Brazil)[2]",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "AMT",
    "Name": "Armenia Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "ART",
    "Name": "Argentina Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "AST",
    "Name": "Arabia Standard Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "AST",
    "Name": "Atlantic Standard Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "AWST",
    "Name": "Australian Western Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "AZOST",
    "Name": "Azores Summer Time",
    "UTC offset": "UTC±00"
  },
  {
    "Abbr": "AZOT",
    "Name": "Azores Standard Time",
    "UTC offset": "UTC−01"
  },
  {
    "Abbr": "AZT",
    "Name": "Azerbaijan Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "BDT",
    "Name": "Brunei Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "BIOT",
    "Name": "British Indian Ocean Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "BIT",
    "Name": "Baker Island Time",
    "UTC offset": "UTC−12"
  },
  {
    "Abbr": "BOT",
    "Name": "Bolivia Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "BRST",
    "Name": "Brasília Summer Time",
    "UTC offset": "UTC−02"
  },
  {
    "Abbr": "BRT",
    "Name": "Brasilia Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "BST",
    "Name": "Bangladesh Standard Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "BST",
    "Name": "Bougainville Standard Time[3]",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "BST",
    "Name": "British Summer Time (British Standard Time from Feb 1968 to Oct 1971)",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "BTT",
    "Name": "Bhutan Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "CAT",
    "Name": "Central Africa Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "CCT",
    "Name": "Cocos Islands Time",
    "UTC offset": "UTC+06:30"
  },
  {
    "Abbr": "CDT",
    "Name": "Central Daylight Time (North America)",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "CDT",
    "Name": "Cuba Daylight Time[4]",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "CEST",
    "Name": "Central European Summer Time (Cf. HAEC)",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "CET",
    "Name": "Central European Time",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "CHADT",
    "Name": "Chatham Daylight Time",
    "UTC offset": "UTC+13:45"
  },
  {
    "Abbr": "CHAST",
    "Name": "Chatham Standard Time",
    "UTC offset": "UTC+12:45"
  },
  {
    "Abbr": "CHOT",
    "Name": "Choibalsan Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "CHOST",
    "Name": "Choibalsan Summer Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "CHST",
    "Name": "Chamorro Standard Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "CHUT",
    "Name": "Chuuk Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "CIST",
    "Name": "Clipperton Island Standard Time",
    "UTC offset": "UTC−08"
  },
  {
    "Abbr": "CIT",
    "Name": "Central Indonesia Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "CKT",
    "Name": "Cook Island Time",
    "UTC offset": "UTC−10"
  },
  {
    "Abbr": "CLST",
    "Name": "Chile Summer Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "CLT",
    "Name": "Chile Standard Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "COST",
    "Name": "Colombia Summer Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "COT",
    "Name": "Colombia Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "CST",
    "Name": "Central Standard Time (North America)",
    "UTC offset": "UTC−06"
  },
  {
    "Abbr": "CST",
    "Name": "China Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "CST",
    "Name": "Cuba Standard Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "CT",
    "Name": "China Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "CVT",
    "Name": "Cape Verde Time",
    "UTC offset": "UTC−01"
  },
  {
    "Abbr": "CWST",
    "Name": "Central Western Standard Time (Australia) unofficial",
    "UTC offset": "UTC+08:45"
  },
  {
    "Abbr": "CXT",
    "Name": "Christmas Island Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "DAVT",
    "Name": "Davis Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "DDUT",
    "Name": "Dumont d'Urville Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "DFT",
    "Name": "AIX-specific equivalent of Central European Time[NB 1]",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "EASST",
    "Name": "Easter Island Summer Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "EAST",
    "Name": "Easter Island Standard Time",
    "UTC offset": "UTC−06"
  },
  {
    "Abbr": "EAT",
    "Name": "East Africa Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "ECT",
    "Name": "Eastern Caribbean Time (does not recognise DST)",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "ECT",
    "Name": "Ecuador Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "EDT",
    "Name": "Eastern Daylight Time (North America)",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "EEST",
    "Name": "Eastern European Summer Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "EET",
    "Name": "Eastern European Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "EGST",
    "Name": "Eastern Greenland Summer Time",
    "UTC offset": "UTC±00"
  },
  {
    "Abbr": "EGT",
    "Name": "Eastern Greenland Time",
    "UTC offset": "UTC−01"
  },
  {
    "Abbr": "EIT",
    "Name": "Eastern Indonesian Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "EST",
    "Name": "Eastern Standard Time (North America)",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "FET",
    "Name": "Further-eastern European Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "FJT",
    "Name": "Fiji Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "FKST",
    "Name": "Falkland Islands Summer Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "FKT",
    "Name": "Falkland Islands Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "FNT",
    "Name": "Fernando de Noronha Time",
    "UTC offset": "UTC−02"
  },
  {
    "Abbr": "GALT",
    "Name": "Galápagos Time",
    "UTC offset": "UTC−06"
  },
  {
    "Abbr": "GAMT",
    "Name": "Gambier Islands Time",
    "UTC offset": "UTC−09"
  },
  {
    "Abbr": "GET",
    "Name": "Georgia Standard Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "GFT",
    "Name": "French Guiana Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "GILT",
    "Name": "Gilbert Island Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "GIT",
    "Name": "Gambier Island Time",
    "UTC offset": "UTC−09"
  },
  {
    "Abbr": "GMT",
    "Name": "Greenwich Mean Time",
    "UTC offset": "UTC±00"
  },
  {
    "Abbr": "GST",
    "Name": "South Georgia and the South Sandwich Islands Time",
    "UTC offset": "UTC−02"
  },
  {
    "Abbr": "GST",
    "Name": "Gulf Standard Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "GYT",
    "Name": "Guyana Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "HDT",
    "Name": "Hawaii–Aleutian Daylight Time",
    "UTC offset": "UTC−09"
  },
  {
    "Abbr": "HAEC",
    "Name": "Heure Avancée d'Europe Centrale French-language name for CEST",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "HST",
    "Name": "Hawaii–Aleutian Standard Time",
    "UTC offset": "UTC−10"
  },
  {
    "Abbr": "HKT",
    "Name": "Hong Kong Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "HMT",
    "Name": "Heard and McDonald Islands Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "HOVST",
    "Name": "Khovd Summer Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "HOVT",
    "Name": "Khovd Standard Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "ICT",
    "Name": "Indochina Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "IDLW",
    "Name": "International Day Line West time zone",
    "UTC offset": "UTC-12"
  },
  {
    "Abbr": "IDT",
    "Name": "Israel Daylight Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "IOT",
    "Name": "Indian Ocean Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "IRDT",
    "Name": "Iran Daylight Time",
    "UTC offset": "UTC+04:30"
  },
  {
    "Abbr": "IRKT",
    "Name": "Irkutsk Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "IRST",
    "Name": "Iran Standard Time",
    "UTC offset": "UTC+03:30"
  },
  {
    "Abbr": "IST1",
    "Name": "Indian Standard Time",
    "UTC offset": "UTC+05:30"
  },
  {
    "Abbr": "IST2",
    "Name": "Irish Standard Time[5]",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "IST3",
    "Name": "Israel Standard Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "JST",
    "Name": "Japan Standard Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "KGT",
    "Name": "Kyrgyzstan Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "KOST",
    "Name": "Kosrae Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "KRAT",
    "Name": "Krasnoyarsk Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "KST",
    "Name": "Korea Standard Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "LHST",
    "Name": "Lord Howe Standard Time",
    "UTC offset": "UTC+10:30"
  },
  {
    "Abbr": "LHST",
    "Name": "Lord Howe Summer Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "LINT",
    "Name": "Line Islands Time",
    "UTC offset": "UTC+14"
  },
  {
    "Abbr": "MAGT",
    "Name": "Magadan Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "MART",
    "Name": "Marquesas Islands Time",
    "UTC offset": "UTC−09:30"
  },
  {
    "Abbr": "MAWT",
    "Name": "Mawson Station Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "MDT",
    "Name": "Mountain Daylight Time (North America)",
    "UTC offset": "UTC−06"
  },
  {
    "Abbr": "MET",
    "Name": "Middle European Time Same zone as CET",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "MEST",
    "Name": "Middle European Summer Time Same zone as CEST",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "MHT",
    "Name": "Marshall Islands Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "MIST",
    "Name": "Macquarie Island Station Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "MIT",
    "Name": "Marquesas Islands Time",
    "UTC offset": "UTC−09:30"
  },
  {
    "Abbr": "MMT",
    "Name": "Myanmar Standard Time",
    "UTC offset": "UTC+06:30"
  },
  {
    "Abbr": "MSK",
    "Name": "Moscow Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "MST",
    "Name": "Malaysia Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "MST",
    "Name": "Mountain Standard Time (North America)",
    "UTC offset": "UTC−07"
  },
  {
    "Abbr": "MUT",
    "Name": "Mauritius Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "MVT",
    "Name": "Maldives Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "MYT",
    "Name": "Malaysia Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "NCT",
    "Name": "New Caledonia Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "NDT",
    "Name": "Newfoundland Daylight Time",
    "UTC offset": "UTC−02:30"
  },
  {
    "Abbr": "NFT",
    "Name": "Norfolk Island Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "NPT",
    "Name": "Nepal Time",
    "UTC offset": "UTC+05:45"
  },
  {
    "Abbr": "NST",
    "Name": "Newfoundland Standard Time",
    "UTC offset": "UTC−03:30"
  },
  {
    "Abbr": "NT",
    "Name": "Newfoundland Time",
    "UTC offset": "UTC−03:30"
  },
  {
    "Abbr": "NUT",
    "Name": "Niue Time",
    "UTC offset": "UTC−11"
  },
  {
    "Abbr": "NZDT",
    "Name": "New Zealand Daylight Time",
    "UTC offset": "UTC+13"
  },
  {
    "Abbr": "NZST",
    "Name": "New Zealand Standard Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "OMST",
    "Name": "Omsk Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "ORAT",
    "Name": "Oral Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "PDT",
    "Name": "Pacific Daylight Time (North America)",
    "UTC offset": "UTC−07"
  },
  {
    "Abbr": "PET",
    "Name": "Peru Time",
    "UTC offset": "UTC−05"
  },
  {
    "Abbr": "PETT",
    "Name": "Kamchatka Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "PGT",
    "Name": "Papua New Guinea Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "PHOT",
    "Name": "Phoenix Island Time",
    "UTC offset": "UTC+13"
  },
  {
    "Abbr": "PHT",
    "Name": "Philippine Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "PKT",
    "Name": "Pakistan Standard Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "PMDT",
    "Name": "Saint Pierre and Miquelon Daylight Time",
    "UTC offset": "UTC−02"
  },
  {
    "Abbr": "PMST",
    "Name": "Saint Pierre and Miquelon Standard Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "PONT",
    "Name": "Pohnpei Standard Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "PST",
    "Name": "Pacific Standard Time (North America)",
    "UTC offset": "UTC−08"
  },
  {
    "Abbr": "PST",
    "Name": "Philippine Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "PYST",
    "Name": "Paraguay Summer Time[6]",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "PYT",
    "Name": "Paraguay Time[7]",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "RET",
    "Name": "Réunion Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "ROTT",
    "Name": "Rothera Research Station Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "SAKT",
    "Name": "Sakhalin Island Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "SAMT",
    "Name": "Samara Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "SAST",
    "Name": "South African Standard Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "SBT",
    "Name": "Solomon Islands Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "SCT",
    "Name": "Seychelles Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "SDT",
    "Name": "Samoa Daylight Time",
    "UTC offset": "UTC−10"
  },
  {
    "Abbr": "SGT",
    "Name": "Singapore Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "SLST",
    "Name": "Sri Lanka Standard Time",
    "UTC offset": "UTC+05:30"
  },
  {
    "Abbr": "SRET",
    "Name": "Srednekolymsk Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "SRT",
    "Name": "Suriname Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "SST",
    "Name": "Samoa Standard Time",
    "UTC offset": "UTC−11"
  },
  {
    "Abbr": "SST",
    "Name": "Singapore Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "SYOT",
    "Name": "Showa Station Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "TAHT",
    "Name": "Tahiti Time",
    "UTC offset": "UTC−10"
  },
  {
    "Abbr": "THA",
    "Name": "Thailand Standard Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "TFT",
    "Name": "Indian/Kerguelen",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "TJT",
    "Name": "Tajikistan Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "TKT",
    "Name": "Tokelau Time",
    "UTC offset": "UTC+13"
  },
  {
    "Abbr": "TLT",
    "Name": "Timor Leste Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "TMT",
    "Name": "Turkmenistan Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "TRT",
    "Name": "Turkey Time",
    "UTC offset": "UTC+03"
  },
  {
    "Abbr": "TOT",
    "Name": "Tonga Time",
    "UTC offset": "UTC+13"
  },
  {
    "Abbr": "TVT",
    "Name": "Tuvalu Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "ULAST",
    "Name": "Ulaanbaatar Summer Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "ULAT",
    "Name": "Ulaanbaatar Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "USZ1",
    "Name": "Kaliningrad Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "UTC",
    "Name": "Coordinated Universal Time",
    "UTC offset": "UTC±00"
  },
  {
    "Abbr": "UYST",
    "Name": "Uruguay Summer Time",
    "UTC offset": "UTC−02"
  },
  {
    "Abbr": "UYT",
    "Name": "Uruguay Standard Time",
    "UTC offset": "UTC−03"
  },
  {
    "Abbr": "UZT",
    "Name": "Uzbekistan Time",
    "UTC offset": "UTC+05"
  },
  {
    "Abbr": "VET",
    "Name": "Venezuelan Standard Time",
    "UTC offset": "UTC−04"
  },
  {
    "Abbr": "VLAT",
    "Name": "Vladivostok Time",
    "UTC offset": "UTC+10"
  },
  {
    "Abbr": "VOLT",
    "Name": "Volgograd Time",
    "UTC offset": "UTC+04"
  },
  {
    "Abbr": "VOST",
    "Name": "Vostok Station Time",
    "UTC offset": "UTC+06"
  },
  {
    "Abbr": "VUT",
    "Name": "Vanuatu Time",
    "UTC offset": "UTC+11"
  },
  {
    "Abbr": "WAKT",
    "Name": "Wake Island Time",
    "UTC offset": "UTC+12"
  },
  {
    "Abbr": "WAST",
    "Name": "West Africa Summer Time",
    "UTC offset": "UTC+02"
  },
  {
    "Abbr": "WAT",
    "Name": "West Africa Time",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "WEST",
    "Name": "Western European Summer Time",
    "UTC offset": "UTC+01"
  },
  {
    "Abbr": "WET",
    "Name": "Western European Time",
    "UTC offset": "UTC±00"
  },
  {
    "Abbr": "WIT",
    "Name": "Western Indonesian Time",
    "UTC offset": "UTC+07"
  },
  {
    "Abbr": "WST",
    "Name": "Western Standard Time",
    "UTC offset": "UTC+08"
  },
  {
    "Abbr": "YAKT",
    "Name": "Yakutsk Time",
    "UTC offset": "UTC+09"
  },
  {
    "Abbr": "YEKT",
    "Name": "Yekaterinburg Time",
    "UTC offset": "UTC+05"
  }
];

  var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZTg2OTA3N2ItMzdhNy00OGM2LWIzZWMtOTQyNzdhZDMzYzdm"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  










//http://localhost:5000/notification?messege=hellow
var app = express();  
var server = require('http').createServer(app);  
app.use(express.static(__dirname + '/node_modules'));  
app.get('/notification', (req, res) =>
{
  var mssg= req.param('messege');
  var head = req.param('heading');
  var flag = req.param('flag');
  var data =req.param('data');
  



  

var date=req.param('date')
  var time=req.param('time')
  var tz=req.param('tz')
  var utc=00;
  var type=req.param('type')







timezone.forEach(function(element) {
if(element['Abbr']==tz){
utc=element['UTC offset']

}
  
}, this);



  console.log(tz)
if(time){
  var send_after = date+", "+time +" "+utc
}else{
  var send_after = "April 22 2018, 9:00:00 pm" +utc

}
  //September 24th 2015, 2:00:00 pm UTC-07:00"


console.log(send_after)

  var message = { 
    app_id: "abd823f7-38ae-45ef-b340-b47dea4062a7",

    headings:{"en": head},
    contents: {"en": mssg},
    included_segments: [flag],
  };

var dmessg=message;
  if(data){


  message['data']={"abc":data}

var dmessg=message;

  }





      
  if(send_after){

    message['send_after']=send_after
    
  }






  //res.send(messege);
 

if(mssg==null||head==null ||flag==null){

  if(mssg==null){
    res.send('plaese Enter a messege');
    
    }

    if(head==null){
      res.send('plaese Enter a Header');
      
      }

      if(flag==null){
        res.send('plaese Enter a flag');
        
        }
}else{

  
}
  
var ress =sendNotification(message);

if(type=='double'){
  var ress =sendNotification(dmessg);
    }

  if(ress==Error){
   res.send('Error');

  }
  else if(ress==null) 
  {  

    res.send('ok');

   }

   else{

    res.send(ress);

   }
}

)





app.get('/menu', (req, res) =>
{
  
   var sql = require("mssql");

   // config for your database
   var config = {
       user: 'nfopapp',
       password: '2$t@TeS1',
       server: '52.34.218.113',
       database:'VUE_IUECWEB'
   };

   // connect to your database
   sql.connect(config, function (err) {
   
       if (err) console.log(err);

       // create Request object
       var request = new sql.Request();
          
       // query to the database and get the records
   /* request.query('select * from ', function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });*/


       request.execute('[GetMenuMasterList]', function(err, recordsets, returnValue) {
        // ... error checks
/*
        console.log(recordsets.length); // count of recordsets returned by the procedure
        console.log(recordsets[0].length); // count of rows contained in first recordset
        console.log(returnValue); // procedure return value
        console.log(recordsets.returnValue); // same as previous line
        console.log(affected); // number of rows affected by the statemens
        console.log(recordsets.rowsAffected); // same as previous line


*/

var menu = {}
if (err) console.log(err);
console.log(recordsets.recordset)

res.send(recordsets.recordset);
sql.close()
//return();
/*
for (var key in recordsets.recordset) {
  if (key.IsHeader==true&&) {


    IsChild: false,
    IsSub: false

 
    
  }
}
   */


          
                     // send records as a response
                     //res.send(recordset);
      
    });



   });


  //ßß sql.close();
});







app.get('/header', (req, res) =>
{
  
   var sql = require("mssql");

   // config for your database
   var config = {
       user: 'nfopapp',
       password: '2$t@TeS1',
       server: '52.34.218.113',
       database:'VUE_IUECWEB'
   };

   // connect to your database
   sql.connect(config, function (err) {
   
       if (err) console.log(err);

       // create Request object
       var request = new sql.Request();
          
       // query to the database and get the records
   /* request.query('select * from ', function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });*/


       request.execute('[GetStaicPageApp]', function(err, recordsets, returnValue) {
        // ... error checks
/*
        console.log(recordsets.length); // count of recordsets returned by the procedure
        console.log(recordsets[0].length); // count of rows contained in first recordset
        console.log(returnValue); // procedure return value
        console.log(recordsets.returnValue); // same as previous line
        console.log(affected); // number of rows affected by the statemens
        console.log(recordsets.rowsAffected); // same as previous line


*/

var menu = {}
if (err) console.log(err);
console.log(recordsets.recordset)

res.send(recordsets.recordset);

sql.close()
//return();
/*
for (var key in recordsets.recordset) {
  if (key.IsHeader==true&&) {


    IsChild: false,
    IsSub: false

 
    
  }
}
   */


          
                     // send records as a response
                     //res.send(recordset);
      
    });



   });


  //ßß sql.close();
});







server.listen(PORT, () => console.log(`Listening on ${ PORT }`))


//http://example.com/api/users?id=4&token=sdfa3&geo=us