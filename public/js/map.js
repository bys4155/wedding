document.addEventListener("DOMContentLoaded", function(){
});
var kakaoMap = {
    map : null,
    mapContainer : document.getElementById('map'),    // 지도를 표시할 div
    mapOption : {
        center: new kakao.maps.LatLng(37.5276053,126.8960481), // 웨스턴베니비스 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    },
    positions : [
        {
            content: '<div>웨스턴 베니비스 웨딩홀</div>',
            latlng: new kakao.maps.LatLng(37.5276053,126.8960481)
        },
        {
            content: '<div>외부 주차장(삼성생명서비스 지하 B1~B4)</div>',
            latlng: new kakao.maps.LatLng(37.5283421,126.8967907)
        }
    ],
    parkingLinePath : [ //세로 , 가로
        new kakao.maps.LatLng(37.5283421,126.8967907), //출발
        new kakao.maps.LatLng(37.5281421,126.8967907),
        new kakao.maps.LatLng(37.5280821,126.8969507), //횡단보도
        new kakao.maps.LatLng(37.5277821,126.8967507), //횡단보도 끝
        new kakao.maps.LatLng(37.5279521,126.8964107), //
        new kakao.maps.LatLng(37.5278900,126.8963107), // 도착
        new kakao.maps.LatLng(37.5276053,126.8960481) //웨스턴베니비스 좌표
    ],
    init : function() {
        this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);
        this.map.setDraggable(false);
        this.setMarker();       //기본 마커 설정
        this.setCustomOverlay(); // 주차장 커스텀 오버레이
        this.setParkingLine();  //주차장에서 오는길 라인
    },
    setMarker : function (){
        for (var i = 0; i < this.positions.length; i ++) {
            var _self = this;
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: this.map, // 마커를 표시할 지도
                position: this.positions[i].latlng // 마커의 위치
            });

            // 마커에 표시할 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: this.positions[i].content // 인포윈도우에 표시할 내용
            });

           // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
           /*
           kakao.maps.event.addListener(marker, 'mouseover', function() {
               console.log(marker)
                infowindow.open(kakaoMap.map, marker);
            });
           kakao.maps.event.addListener(marker, 'mouseout',  function() {
                infowindow.close();
            });
           */
            kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(this.map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));
        }
    },
    setUnlockToggle : function () {
        var control = document.getElementById('mapControl');
        var isChk =  this.map.getDraggable();
        if(isChk) {
            control.className = '';
            this.map.setDraggable(false);

        } else {
            control.className = 'active';
            this.map.setDraggable(true);
        }
    },
    setParkingLine : function () {
        // 지도에 표시할 선을 생성합니다
        var polyline = new kakao.maps.Polyline({
            path: this.parkingLinePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FFAE00', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        polyline.setMap(this.map);
    },
    setCustomOverlay : function () {
        new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(37.5283421,126.8967907),
            content: '<div class="customoverlay">' +
                // '  <a href="https://map.kakao.com/link/map/1647687761" target="_blank">' +
                '  <a href="">' +
                '    <span class="title">외부 주차장<br>(삼성생명서비스 지하 B1~B4)</span>' +
                '  </a>' +
                '</div>',
            yAnchor: 1
        });
    },
    makeOverListener: function (map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
        };
    },
    makeOutListener : function (infowindow) {
        return function() {
            infowindow.close();
        };
    }

}

var setBtn = {
    roadmap : function (){
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    },
    traffic : function() {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    },
    skyview : function (){
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.SKYVIEW);
    },
    bicyle : function () {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
    }

}

//카카오맵 초기화
kakaoMap.init();
