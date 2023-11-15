import React, { useEffect, useState } from "react";
import "./spot.css";
import { withRouter } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const MapConponent = ({ history }) => {
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [keyword, setKeyword] = useState("빵집"); // 검색 키워드를 초기화합니다.
    const [selectedGu, setSelectedGu] = useState("종로구"); // 선택한 구를 초기화합니다.
    const [markers, setMarkers] = useState([]); // 마커 목록을 초기화합니다.
    const mapContainer = React.createRef(); // 지도 컨테이너에 대한 참조를 생성합니다.
    const [searchResults, setSearchResults] = useState([]); // 검색 결과를 초기화합니다.
    const [lastMarkerClickTime, setLastMarkerClickTime] = useState(0);

    const seoulGus = [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
    ];

    const markerImagesByGu = {
        종로구: [
            "https://dw82ptradz9jo.cloudfront.net/daylog/6422711d3d8890566f666b6e/e0c87fbf-4759-4dd8-864f-3d4229cc4f9d",
            "https://mblogthumb-phinf.pstatic.net/MjAxOTEyMjZfMjE2/MDAxNTc3Mjg2ODI3NDMy.mZQn-nwCTVhrDcrEqJ_GcB1uE2ecm0WAQnrr9ZQlWycg.YadjyR1QY2Gj6yUhqDYiqXKPcI5oMKQI245r9ZzsPDkg.JPEG.pholive21/1577286826870.jpg?type=w800",
            "https://thingool123.godohosting.com/data/goods/editor/211221/KakaoTalk_20211221_215035662_215340.jpg",
            "https://tong.visitkorea.or.kr/cms/resource/42/2899542_image2_1.jpg",
            "https://ak-d.tripcdn.com/images/1i6712224q5qah42o9BD5_W_400_0_R5_Q90.jpg?proc=source/trip",
            "https://mblogthumb-phinf.pstatic.net/MjAyMDAxMTFfMjIy/MDAxNTc4NzMzMjQ3ODQ0.5PyJHVn2Vw4ajOkSgrvtov4X3aCaaih_-Jb39kTXtSwg.Pt3J1YJuJEiyVoMaibKbRSjWeq0zWt7X36guvr5xf9cg.JPEG.zephyr122059/20200111_113456.jpg?type=w800",
        ],
        중구: [
            "https://image.hmall.com/static/image/sect/brand/disp_img/dispM73747.jpg",
            "https://blog.kakaocdn.net/dn/bn94m1/btq6Sxcyzu3/cw7lwk03pyKdAgnZy8FU70/img.png",
            "https://d12zq4w4guyljn.cloudfront.net/750_750_20190913023141_photo3_260380da8d55.jpg",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDJfODQg/MDAxNjY0NzIyNjI5Mjg0.JMkG-ZrNbCx1nsgPK9jmj0dDUkzVmEHhKJjFGYnmN5og.0A9zWVLyC1zLD4m54ehOFMMtGK0kb6zDg4fPWtYfFTsg.JPEG.sksaudwl/SE-e75ba465-40be-11ed-a489-2725ff708b7f.jpg?type=w800",
            "https://d3g2yh83to8qa2.cloudfront.net/wp-content/uploads/sites/45/2023/09/11062748/08.%ED%8C%A8%EC%8A%A4%ED%8A%B8%EB%A6%AC-%EB%B6%80%ED%8B%B0%ED%81%AC-990x590.jpg",
            "https://blog.kakaocdn.net/dn/wJ3Wl/btqGC51anpj/DDZpx7LW6y3cPW6t5vRF7K/img.jpg",
        ],
        용산구: [
            "https://패션5.com/web/upload/share-image-1-79acb826175edf239cbd6a2e10a8421b.jpg",
            "https://img.seoul.co.kr/img/upload/2020/01/17/SSI_20200117160050.png",
            "https://d3af5evjz6cdzs.cloudfront.net/images/uploads/320x0/thebakerstable_logo_sq_2a1edab28d8d92b4cc778e2319ab31cc.jpg",
            "https://mblogthumb-phinf.pstatic.net/20150224_245/yujihu_1424714456498uPjTr_JPEG/DSC01259-1.jpg?type=w420",
            "https://blog.kakaocdn.net/dn/bHHldd/btqK6fTtAKb/FRneuKteHr6NRqQp2PcszK/img.jpg",
            "https://t1.daumcdn.net/cfile/tistory/99327A385C6E1C1A39",
        ],
        성동구: [
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MjVfNzQg/MDAxNTU4Nzg4NDU4OTQ0.QvcHyAkIPenSj4tcfdYeRIW32Xfz3cHlGWyw1pUh_Skg.wZ_NlmoT-BWW4S7I6WGeHMIu3UEERcW7jMEaD8UcH1og.JPEG.leekh8412/DSC07648.jpg?type=w800",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA4MjBfMjA2/MDAxNjYwOTkwNzc5OTc4.jTZdsbLsUPKLBjO4Or3dm8kzJzUifYH7mpIr2Ani6iQg.7e3FVQMB_tYbxFbrVEr3yo9J9UpM-mDXT9IOG9OjwjMg.JPEG.etienne03/IMG_E9629.JPG?type=w800",
            "https://lh3.googleusercontent.com/p/AF1QipN72mX0dSc983VHDCPm83VpH8l7OjJweOj603v9=s1360-w1360-h1020",
            "https://ak-d.tripcdn.com/images/1mi5v2224uncwujgx174B.jpg?proc=source/trip",
            "https://krsc.kr/program/operation/mainupload/%ED%82%A4%EB%B2%A0%EC%9D%B4%EC%BB%A4%EB%A6%AC_%EC%9D%B8%EC%8A%A4%ED%83%802.jpg",
            "https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTBfMTU4/MDAxNjM5MTIwMTMwOTU3.DLNmcYP7Hpmmdz331m4-ZeFOE3WTCiIIFIkg7zPteTgg.PMvTSukNEzHWC5mfaiV6rlqaIPIwym-x1ysS3XvPpXQg.JPEG.annamyong525/20211207%EF%BC%BF171325.jpg?type=w800",
        ],
        광진구: [
            "https://d12zq4w4guyljn.cloudfront.net/750_750_20220106202058_photo7_26b151aebb34.jpg",
            "https://mp-seoul-image-production-s3.mangoplate.com/9239_1652079964054491.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
            "https://blog.kakaocdn.net/dn/mQLxh/btqBGe3cXbJ/FPNGqAbKhOZ8sCXXZskAo1/img.jpg",
            "https://blog.kakaocdn.net/dn/cBc1zG/btqE2kZByr8/B8EUB0sl3DjVZCp0o6850k/img.jpg",
            "https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTZfMTIz/MDAxNjM5NjQwMTkxNzIz.um8iZ9dWB4CEZVrsk7e_Gu_9-UOUhb2fXH1vGnvdG7Eg.4Mv6PHO1knjKV35_wL4k9Li_7vCK0rm6nYAUxEZisC4g.JPEG.iraiyoga/KakaoTalk_20211216_162846495_05.jpg?type=w800",
            "https://www.jumpoline.com//_file/chain/store/131764645289961292.jpg",
        ],
        동대문구: [
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MDFfMjc3/MDAxNTU0MTE1NjQ4MDU4.exlUrqx2of7ckN4lupTEHmCuzvmk5ryinNCcwHauJDMg._1TSONNgcNNlGrajQbQa1Qehtl5MlZHaE01y8goF8Zgg.JPEG.journey_me/20190401_142417.jpg?type=w800",
            "https://imgs.jobkorea.co.kr/img3/_thumb/300x0/Company/Visual_Co/images/2020/7/JK_CO_bonnoel1225_1.jpg",
            "https://blog.kakaocdn.net/dn/BvR2q/btrr5VKQPLD/loCfPOV8DW0A5i81Imh8Mk/img.jpg",
            "https://lh3.googleusercontent.com/p/AF1QipOiKExYNOj56lNMT1r51F0Ar2d9LmYjANaoURHQ=w768-h768-n-o-v1",
            "https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTFfMjg2/MDAxNjgxMTkwMjM5NzM0.EsPK3Y0D6_1LuSqbxZMN8yC9LAGBF7hg_e-gVpzWIx4g.trmUJy5KIXObk3Sv3zDyg69cE0V7kiLuuZlfRFf-bHYg.JPEG.aaron8305/IMG_0358.jpg?type=w800",
            "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMTRfODQg/MDAxNjAyNjYxMDY2Njk0.XLL-CMDHXnQ6HwbRrR-aqYgyI0P8TkZIoMFL2Vrb1BUg.XBN0ekl-iUrE6MN_x7dNzg8v2V03cFBPSi22gMdcmwwg.JPEG.cha729/1602661065702.jpg?type=w800",
        ],
        중랑구: [
            "https://ojsfile.ohmynews.com/STD_IMG_FILE/2017/0915/IE002218004_STD.jpg",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA4MjVfMjY0/MDAxNjYxNDM2MjM0ODcw.A8I9SBSX3YAWjH2KRdf8hKeTQTqq4ZQREk1qKln0vBMg.m9gdBAPUUZLt3PNk1E0zFY7jMYoV_IqMPV67ZP6j7Bgg.JPEG.j950005/IMG_5397.jpg?type=w800",
            "https://mblogthumb-phinf.pstatic.net/MjAxOTAzMDdfMjg3/MDAxNTUxOTIxMzMyODQ4.Vk2RrCvpBhExftmimu9YNvYqVy5tLiYpJHbuI4Ypoiwg.GAOMk0YEuhF20LNl1ZC3JXe-Gn94tb4jjQG0aERkVI8g.JPEG.glimyeo/%EB%8F%99%EB%B6%80%EA%B3%A0%EB%A0%A4%EC%A0%9C%EA%B3%BC4.jpg?type=w800",
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjhfMjE0/MDAxNTY2OTk5ODQwNTAw.g7aYdahdlFYlXozjrKiGetOWqI179PHo3EtEvHuIQoMg.XHMiCCgVFhn_TRs7l6Fhw-sG-tGFuMkIuOjydDXA7ZMg.JPEG.gghh0013/20190828_192705.jpg?type=w800",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDZfMTYz/MDAxNjQ0MTU5NTY5NTY0.Ov6yzccIlkUzx3-Exo_0SY9Hc8o8LWmOhPbuvh9OgH8g.sFEqlW32Phs9aA7E5HAKw3T56VczyCvCMEus5ZIDvjEg.JPEG.pem840831/20220201_203948.jpg?type=w800",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
        ],
        성북구: [
            "https://t1.daumcdn.net/cfile/tistory/996358445CCF25C004",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2Fpk0zp%2FbtrgU2gMKaT%2F1PjSD2RcElC7FdUZood7p1%2Fimg.jpg",
            "https://t1.daumcdn.net/cfile/tistory/99D4AA3B5E401BEA0D",
            "https://mp-seoul-image-production-s3.mangoplate.com/1841276_1625559431883973.jpg?fit=around%7C512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
            "https://d12zq4w4guyljn.cloudfront.net/750_750_20211012052002546_photo_15aff1843b38.jpg",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
        ],
        강북구: [
            "https://th.bing.com/th/id/OIP.wXiQPgLUnH5OC6OG5mf_4QHaFj?pid=ImgDet",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDhfMjIy/MDAxNjA0ODM4NjMwNDk2.X1_M7xIPOPoK1vpRuX5nFMqq8zFegAmrEkS3Xe0c0AIg.53yfv2jFkqoR3o3rh7n5DqUAgt-cgKAoC2OIvIc3BW8g.JPEG.heumsworld/SE-693a42dd-94b0-416e-ac61-ba049e261169.jpg?type=w800",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjhfMjc2/MDAxNjU2Mzk3MTY2MTIw.O1_4QcnYPW_GqI7PNuqEOM-CqL4RcrDy-Y3ipSJVgjog.Mt0L49gAaWtnJbCtjWF901BpvOrbMx-gA5wu4xPFgPkg.JPEG.boooonny/IMG_0093.jpg?type=w800",
            "https://search.pstatic.net/common/?autoRotate=true&quality=100&type=f640_380&src=https:%2F%2Fldb-phinf.pstatic.net%2F20200228_194%2F1582885750740L5mCN_JPEG%2FlrKCYhVdThPc5oJXe_0RPzen.jpg",
        ],
        도봉구: [
            "https://image.jtbcplus.kr/data/UPLOAD/eee_hotplace6/IMG_2023_04_18/mod_059274571001.jpg",
            "https://mblogthumb-phinf.pstatic.net/MjAyMDExMjhfMSAg/MDAxNjA2NTU4ODAyMzQy.Z9elXnyCS9yC1-iOs6zkI3pazklmsZ_RQh-4mubeb7Ig.Vt5T-s3UoivLsk_PKOLWs7-DM2O39KScytFFuxi97iUg.JPEG.snowa12/SE-a82af4fc-6291-4ae5-81d3-bb90103c5555.jpg?type=w800",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://yt3.ggpht.com/a/AGF-l79WsZG1rLtoEk4_wA_1CpUrPWWpWkzHFRTflg=s900-mo-c-c0xffffffff-rj-k-no",
            "https://th.bing.com/th/id/OIP.1na0LBJIrhrP5_xXeW_eowHaHa?pid=ImgDet",
            "https://yt3.ggpht.com/a/AGF-l79WsZG1rLtoEk4_wA_1CpUrPWWpWkzHFRTflg=s900-mo-c-c0xffffffff-rj-k-no",
        ],
        노원구: [
            "https://th.bing.com/th/id/OIP.Qf9b6W4MEJGGEQubTqZ2pAHaFx?pid=ImgDet",
            "https://th.bing.com/th/id/OIP.r-nWywdYzsNr6aQfpJw3CwHaHa?pid=ImgDet",
            "https://modo-phinf.pstatic.net/20190722_108/1563775346460T4DOT_JPEG/mosa4j7r08.jpeg?type=a1100",
            "https://th.bing.com/th/id/R.843bb94bffde1e371621bf2219adbd05?rik=nRj4X%2fssTz2ynA&riu=http%3a%2f%2fldb.phinf.naver.net%2f20190715_201%2f15631902602521QTu7_JPEG%2fDhVhd3xj8yUE928SnP5Jxs_m.jpg&ehk=tolVoLyId%2bhArSKhfGeMPKEeaRmZYWZ6rMFq%2fu0FBL4%3d&risl=&pid=ImgRaw&r=0",
            "https://mp-seoul-image-production-s3.mangoplate.com/464235/947758_1628075414952_17892",
            "https://mblogthumb-phinf.pstatic.net/MjAyMzA0MTZfODEg/MDAxNjgxNjE3OTEwMzY5.pdarzfY4PEe-oQf-kNYhvrFdo-JmxvZMsnKED_hzkfUg.QvFG1IfNOf6KCmf25si_rViezN6QsFVSvh7OW9R7evYg.JPEG.chow267/IMG_4942.jpg?type=w800",
        ],
        은평구: [
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://mp-seoul-image-production-s3.mangoplate.com/291236/1466243_1579057946550_8823",
            "https://th.bing.com/th/id/OIP.XyJBpuUyRHt80ZD-VcgRjgHaJ4?pid=ImgDet",
            "https://yt3.ggpht.com/a/AGF-l79WsZG1rLtoEk4_wA_1CpUrPWWpWkzHFRTflg=s900-mo-c-c0xffffffff-rj-k-no",
            "https://cphoto.asiae.co.kr/listimglink/1/2017061607203587293_2.jpg",
            "https://ldb-phinf.pstatic.net/20221218_3/1671353601582zfcRM_JPEG/KakaoTalk_20221218_172925327.jpg",
        ],
        서대문구: [
            "https://th.bing.com/th/id/R.aba0c0a40741208e5c8fd365f49f3a23?rik=H19cJ8WG07KgBQ&riu=http%3a%2f%2ftong.visitkorea.or.kr%2fcms%2fresource%2f57%2f2892057_image2_1.jpg&ehk=CXbGXC9fcPf6%2b8QGrtBVoZyO6pYScD%2bM12hBDyAvXH4%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.XK10lumwHqUbTujXMuk9sQHaFj?pid=ImgDet",
            "https://t1.daumcdn.net/cfile/tistory/211C8D3E580EBC9E1A",
            "https://mp-seoul-image-production-s3.mangoplate.com/586336_1650100393246140.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/19/4d/1e/78/cafe2.jpg",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2F8mqZZ%2FbtqFTSuS7P7%2FnTPNraqsiRRWAekdhiAaz1%2Fimg.jpg",
        ],
        마포구: [
            "https://th.bing.com/th/id/OIP.kmOMvgihCc0Uq3CIWAyvHwHaHa?pid=ImgDet",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2F5zKSN%2FbtrBtChGNXP%2FnXSJTLS1ZpfhQZiKR8I1F1%2Fimg.jpg",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FbA2CeE%2FbtqDnwgnbUc%2FywyyL03PnjFOJtpkOgCX90%2Fimg.jpg",
            "https://th.bing.com/th/id/OIP.OSPmHFOY4So3akj8PHPrZAHaJ4?pid=ImgDet",
            "https://th.bing.com/th/id/R.7d544a0e91c24e5ba0bf93f9366c9404?rik=Z007GOS5%2bbWffw&riu=http%3a%2f%2fpostfiles4.naver.net%2f20160114_19%2fonsili_1452783188678ekd6L_JPEG%2f1.JPG%3ftype%3dw1&ehk=j74hh7oU5iFU5%2bFxjTWCHQLPdO%2bwQOfej5tdrVqVv5s%3d&risl=&pid=ImgRaw&r=0",
            "https://emmaru.com/matzip/include/pics/2019/11/07/m_17221S222928_1.jpg",
        ],
        양천구: [
            "https://t1.daumcdn.net/cfile/tistory/99D6DD385BEF2CEF11",
            "https://mp-seoul-image-production-s3.mangoplate.com/576647_1595142414720340.jpg",
            "https://www.menupan.com/restaurant/restimg/005/zzimg/g101615a_z.jpg",
            "https://d2uja84sd90jmv.cloudfront.net/posts/7CN_3wuY_41Z0v4wr2hmJQ/m.jpg",
            "https://th.bing.com/th/id/OIP.XtzvoWW5RFSOgriH4IRXygHaJ3?pid=ImgDet",
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FpSPlS%2FbtqBO7itxSy%2FnsQDTlDxB82Dt55vd2oQl0%2Fimg.jpg",
        ],
        강서구: [
            "https://www.changupdo.com/data/franchise/11309/3416947497_Mf5rHhNd_ED8380EBA5B4EB8DB0EBA7881.jpg",
            "https://cdn.cashfeed.co.kr/attachments/6c921b4810.jpg",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://th.bing.com/th/id/OIP.FBWoVI-XvildvI_b_4C-hQHaFj?pid=ImgDet",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
        ],
        구로구: [
            "https://mp-seoul-image-production-s3.mangoplate.com/883994_1539178754266107.jpg?fit=around%7C512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
            "https://d2uja84sd90jmv.cloudfront.net/posts/Rn4lK-Hi7bZzFMl4oVkRww/m.jpg",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://yt3.ggpht.com/a/AGF-l79WsZG1rLtoEk4_wA_1CpUrPWWpWkzHFRTflg=s900-mo-c-c0xffffffff-rj-k-no",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA3MTFfMjY2/MDAxNjU3NTUwMTQ0MTE0._n3t4AWTaDeAkcbW9f-15MMHhO56DmEFTarFok8-tUMg.3_1DloZgFvRObIwvdMKPlM3Od1ov2i35ImdwRxlwToIg.JPEG.morebetter1026/%EC%88%98%EB%B0%80_%EC%B5%9C%EC%A2%85%EB%A1%9C%EA%B3%A0_%EC%84%B8%EB%A1%9C%ED%98%95_0522.jpg?type=w800",
            "https://th.bing.com/th/id/OIP._VDl5RVjZrQCUAHYzl0nJwHaHa?pid=ImgDet",
        ],
        금천구: [
            "https://th.bing.com/th/id/OIP.BEfSgWTFMssFtnwPJcrVBAHaFB?pid=ImgDet",
            "https://mp-seoul-image-production-s3.mangoplate.com/336764/871825_1509443219182_33014?fit=around%7C512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA0MjhfMTkw/MDAxNjUxMTQ0Nzk1ODc2.-7Wtv6X1WhUMiJCiVSn7yiAUw0g5jLqbuAmx1hLQG_Yg.g7pZT8aySa1htMCydkG--4Xv9dkUnZgt9xVAerXliz8g.JPEG.ailelee/IMG_5343.jpg?type=w800",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://th.bing.com/th/id/OIP.QY9oaUGH_F8nC6N1hvy5MgHaFj?pid=ImgDet",
            "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http:%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99955C345D2ED87133D243",
        ],
        영등포구: [
            "https://1.bp.blogspot.com/-JucouJ1Tdr8/X-w91c6TcUI/AAAAAAAAFBU/x1HZUNEO9dUeE7-i_U0SZQGtwpD1tZ8gQCLcBGAsYHQ/s1440/1608905071560-13.jpg",
            "https://th.bing.com/th/id/OIP.BFfrv1JT2uKFOAlmpr035QHaFj?pid=ImgDet",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://www.menupan.com/restaurant/restimg/009/zzimg/g101669a_z.jpg",
            "https://www.menutong.com/data/editor/2103/77e98e4d0fe52abad6f95fe13a5fa227_1614577123_0405.jpg",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2Fc77Yaf%2FbtqB5F0STe9%2Fbf5CGJHvx6wpcnu8JoxkR0%2Fimg.jpg",
        ],
        동작구: [
            "https://th.bing.com/th/id/OIP.nZHCsjK5M8T59thslYA9ywAAAA?pid=ImgDet",
            "https://i.imgur.com/6LKdB7q.jpg",
            "https://th.bing.com/th/id/OIP.ruQgcOG4wVgpxHduY4JufQHaE8?pid=ImgDet",
            "https://th.bing.com/th/id/OIP.pzpW75CpEfusNkWSUx5JFQHaFj?pid=ImgDet",
            "https://mp-seoul-image-production-s3.mangoplate.com/280237/477776_1605324681035_2464",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
        ],
        관악구: [
            "https://th.bing.com/th/id/R.7e65d310871d37225a6b1321344931ea?rik=mgOeZjn4yz93gw&riu=http%3a%2f%2ftong.visitkorea.or.kr%2fcms%2fresource%2f40%2f2834440_image2_1.jpg&ehk=OpfRa9t%2fxUzGjtGwGvsfwN3zSe%2fT0nK2BIkMRDqtMXs%3d&risl=&pid=ImgRaw&r=0",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FcynPKa%2FbtraJzMURFS%2F9cQOdKjdLymATzAMopaeL1%2Fimg.jpg",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://t1.daumcdn.net/cfile/tistory/99F85D4B5C4978FB0F",
            "https://th.bing.com/th/id/OIP.H7tewCnAsQJqQgDLVGF1fgHaJ4?pid=ImgDet",
            "https://th.bing.com/th/id/OIP._lGOQ_iB2W1DTbrG0CM9hAHaHJ?pid=ImgDet",
        ],
        서초구: [
            "https://cccv-to.s3.ap-northeast-2.amazonaws.com/files/profile/Hh879FAURqSSRM9KGoqv_77kc3TUiiU",
            "https://th.bing.com/th/id/OIP.-X7u1O_P5v1DJMxgpTpYmAHaFj?pid=ImgDet",
            "https://th.bing.com/th/id/OIP.6ez-gV26wRQ_fFgfgLPDxgHaHa?pid=ImgDet",
            "https://th.bing.com/th/id/OIP.rwFpdHxesw4VuAGUx9EfeAHaHa?pid=ImgDet",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FDNqs6%2Fbtq72je6fty%2FpTyjnIA83H57ZxnPBorhA0%2Fimg.jpg",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2F5Az9B%2Fbtrc1eMD6RJ%2FZ2JIUGnNl4QUtKJ8pK77Tk%2Fimg.jpg",
        ],
        강남구: [
            "https://d12zq4w4guyljn.cloudfront.net/750_750_20221123020822_photo1_0737b5043ff4.jpg",
            "https://th.bing.com/th/id/OIP.PTqdu63u4e8pVMh_GEv41wHaHa?pid=ImgDet",
            "https://dundin-net.s3.amazonaws.com/wp/wp-content/uploads/2017/08/01.jpg",
            "https://t1.daumcdn.net/cfile/tistory/992C60505DBE33123B",
            "https://mblogthumb-phinf.pstatic.net/MjAxODA2MDdfMTcg/MDAxNTI4MzMyMTM0OTM5.nLDki51UHHK1GU3vb2z020XEOje3jXykCvzL815pI3kg.pGtUwclZXucvvHSZZzFl0sc7NWajs7CQigdV_vwVvoEg.JPEG.chloesjmin/DSC03075.jpg?type=w800",
            "https://th.bing.com/th/id/OIP.8jsHAyNSCtzS2cjEJ2tP9QHaFj?pid=ImgDet",
        ],
        송파구: [
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2F6LtCw%2FbtrlgGPwxn8%2F2ciDNOa7t2qlkKDKsrMOGk%2Fimg.jpg",
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FYKptt%2FbtstxmOrEPB%2FOgkWdKk1fN8K53TuEys9o1%2Fimg.jpg",
            "https://cdn.imweb.me/upload/S2017031658c9f0af73cab/2e10e5ffc04b5.jpg",
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https:%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F999B78355D24F16509",
            "https://t1.daumcdn.net/cfile/tistory/99311C475EC8DF0B1F",
            "https://t1.daumcdn.net/cfile/tistory/275B3143578405C90F",
        ],
        강동구: [
            "https://th.bing.com/th/id/OIP.t_bPGavf9g1rZ9sK-CzLmwHaJC?pid=ImgDet",
            "https://th.bing.com/th/id/OIP.Bg0PeU657ifHS9Tt-UfBcQHaHa?pid=ImgDet",
            "https://cdn-icons-png.flaticon.com/512/5222/5222369.png",
            "https://localview.co.kr/cp/thumbnail/107064703.jpg",
            "https://th.bing.com/th/id/OIP.GvR2wvJUCEYlVCryk1quhwHaJ3?pid=ImgDet",
            "https://th.bing.com/th/id/R.2c77018eda44a54bc9755898826110d7?rik=ZGE5UfMpUYvtZg&riu=http%3a%2f%2fpostfiles3.naver.net%2f20150214_178%2fmkdkrk_14239228530342oFXp_JPEG%2fDSC02480.jpg%3ftype%3dw1&ehk=KYhyg1MxkynQDLGVZif8EgmstRGBOX56PmTvr2uiU8g%3d&risl=&pid=ImgRaw&r=0",
        ],
    };

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            // Load Kakao Maps API script
            const script = document.createElement("script");
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=07e379ab4c00aabca955315feb5f6347";
            script.async = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        } else {
            // Already loaded, initialize the map
            initializeMap();
        }
    }, []);

    useEffect(() => {
        setLastMarkerClickTime(0);
    }, [searchResults]);

    const initializeMap = () => {
        const container = mapContainer.current;
        const options = {
            center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
            level: 3,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
        const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);
        searchPlaces();
    };

    const searchPlaces = () => {
        if (map) {
            if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
                let finalKeyword = keyword;
                if (selectedGu !== " ") {
                    finalKeyword = selectedGu + " " + keyword;
                }
                const ps = new window.kakao.maps.services.Places();
                const options = { size: 6 };
                ps.keywordSearch(finalKeyword, placesSearchCB, options);
            } else {
                console.error("Kakao 지도 API 서비스가 로드되지 않았습니다.");
            }
        }
    };

    const placesSearchCB = (data, status) => {
        if (map) {
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 존재하지 않습니다.");
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
            }
        }
    };

    const addMarker = (position, title, index) => {
        const imageSrc = "https://cdn-icons-png.flaticon.com/512/5717/5717162.png";
        const imageSize = new window.kakao.maps.Size(36, 36);
        const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 36),
            spriteOrigin: new window.kakao.maps.Point(0, 0),
            offset: new window.kakao.maps.Point(18, 36),
        };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
        });

        marker.setMap(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);

        // 마커에 마우스를 가져다 대면 InfoWindow를 열고 닫도록 합니다.
        window.kakao.maps.event.addListener(marker, "click", () => {
            const currentTime = new Date().getTime();
            const startIdsByGu = {
                종로구: 0,
                용산구: 7,
                // Add start ids for other gu as needed
            };
            const startId = startIdsByGu[selectedGu] || 1;
            const targetId = startId + index;

            if (currentTime - lastMarkerClickTime < 300) {
                // Double click
                history.push(`/read-bakery/${targetId}`);
            } else {
                // Single click
                // 클릭 시 이미 열려 있는 InfoWindow가 있다면 닫기
                if (infowindow) {
                    infowindow.close();
                }

                // Get the address from the place data, assuming you have the address in the place object
                const address = "Place address here"; // Replace with the actual address from your place data

                infowindow.setContent(`
              <div style="background: white; text-align: center;">
                <h3 style="font-size: 14px; margin: 0;">${title}</h3>
                <p style="font-size: 12px; margin: 0;">주소: ${address}</p>
                <a href="/read-bakery/${targetId}" style="color: blue; font-size: 12px; text-decoration: underline;">더보기</a>
              </div>
            `);
                infowindow.open(map, marker);
            }
            setLastMarkerClickTime(currentTime);
        });
    };

    const displayPlaces = (places) => {
        if (map) {
            const bounds = new window.kakao.maps.LatLngBounds();
            removeMarker(); // No need to pass places to removeMarker function

            places.forEach((place, index) => {
                const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
                addMarker(placePosition, place.place_name, index);
                bounds.extend(placePosition);
            });

            map.setBounds(bounds);
            setSearchResults(places);
        }
    };

    // Update removeMarker to accept places as an argument
    const removeMarker = (places) => {
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        setMarkers([]);

        // Clear infowindow content when markers are removed
        if (infowindow) {
            infowindow.close();
        }
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleGuChange = (e) => {
        setSelectedGu(e.target.value);
    };

    const handleSearch = () => {
        searchPlaces();
    };

    const searchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
                    const ps = new window.kakao.maps.services.Places();

                    const options = {
                        location: currentPosition,
                        radius: 1000,
                        sort: window.kakao.maps.services.SortBy.DISTANCE,
                        size: 6,
                    };

                    ps.keywordSearch(
                        keyword,
                        (data, status) => {
                            if (map && status === window.kakao.maps.services.Status.OK) {
                                displayPlaces(data);
                            } else {
                                console.error("Kakao 지도 API 검색 중 오류가 발생했습니다.");
                            }
                        },
                        options
                    );
                },
                (error) => {
                    console.error("현재 위치를 가져오는 중 오류가 발생했습니다:", error);
                }
            );
        } else {
            console.error("이 브라우저에서는 위치 정보를 가져올 수 없습니다.");
        }
    };

    const handleMoreInfoClick = (index) => {
        const startIdsByGu = {
            종로구: 0,
            용산구: 6,
            // Add start ids for other gu as needed
        };
        const startId = startIdsByGu[selectedGu] || 0;
        const targetId = startId + index;
        history.push(`/read-bakery/${targetId}`);
    };

    const renderSearchResults = () => {
        if (searchResults.length === 0) {
            return <p>검색 결과가 없습니다.</p>;
        }

        return (
            <div id="cc" className="card-container">
                {searchResults.map((result, index) => (
                    <div id="cd" key={index} className="card">
                        <img
                            id="cit"
                            src={markerImagesByGu[selectedGu][index] || markerImagesByGu["전체"][index]}
                            className="card-img-top"
                            alt="Card image cap"
                        />
                        <div id="cb" className="card-body">
                            <h5 id="cti" className="card-title">
                                {result.place_name}
                            </h5>
                            <p id="cte" className="card-text">
                                {result.road_address_name || result.address_name}
                            </p>
                            <p id="cte" className="card-text">
                                전화번호: {result.phone}
                            </p>
                            <button id="bbp" className="btn btn-primary" onClick={() => handleMoreInfoClick(index + 1)}>
                                더보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div id="mc" className="map-container">
            <div id="sb" className="search-bar">
                <TextField
                    type="text"
                    placeholder="장소 검색"
                    value={keyword}
                    onChange={handleKeywordChange}
                    variant="outlined"
                    style={{ marginRight: "10px", width: "70%" }}
                />
                <TextField select value={selectedGu} onChange={handleGuChange} variant="outlined" style={{ width: "30%", marginRight: "20px" }}>
                    {seoulGus.map((gu, index) => (
                        <MenuItem key={index} value={gu}>
                            {gu}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: "10px", marginRight: "20px" }}>
                    검색
                </Button>
                <Button variant="contained" color="primary" onClick={searchCurrentLocation} style={{ marginTop: "10px" }}>
                    현재 위치 빵집 검색
                </Button>
                {renderSearchResults()}
            </div>
            <div id="kamap" className="map" ref={mapContainer}></div>
        </div>
    );
};

export default withRouter(MapConponent);
