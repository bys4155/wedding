document.addEventListener("DOMContentLoaded", function(){
});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.5276053,126.8960481), // 웨스턴베니비스 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
var positions = [
    {
        content: '<div>웨스턴베니비스 웨딩홀</div>',
        latlng: new kakao.maps.LatLng(37.5276053,126.8960481)
    },
    {
        content: '<div>외부 주차장(삼성생명서비스 지하 B1~B4)</div>',
        latlng: new kakao.maps.LatLng(37.5283421,126.8967907)
    }
];

for (var i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}


// 주차장 커스텀 오버레이를 생성합니다
var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: new kakao.maps.LatLng(37.5283421,126.8967907),
    content: '<div class="customoverlay">' +
        // '  <a href="https://map.kakao.com/link/map/1647687761" target="_blank">' +
        '  <a href="">' +
        '    <span class="title">외부 주차장<br>(삼성생명서비스 지하 B1~B4)</span>' +
        '  </a>' +
        '</div>',
    yAnchor: 1
});

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}




// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
var polygonPath = [
    new kakao.maps.LatLng(37.5276053,126.8960481),
    new kakao.maps.LatLng(37.5278053,126.8960481),
    new kakao.maps.LatLng(37.5276053,126.8960481),
    new kakao.maps.LatLng(37.5276053,126.8960481)
];

// 지도에 표시할 다각형을 생성합니다
var polygon = new kakao.maps.Polygon({
    path:polygonPath, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'longdash', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7 // 채우기 불투명도 입니다
});
// 지도에 다각형을 표시합니다
polygon.setMap(map);


// 주차장에서 오는길
var linePath = [ //세로 , 가로
    new kakao.maps.LatLng(37.5283421,126.8967907), //출발
    new kakao.maps.LatLng(37.5281421,126.8967907),
    new kakao.maps.LatLng(37.5280821,126.8969507), //횡단보도
    new kakao.maps.LatLng(37.5277821,126.8967507), //횡단보도 끝
    new kakao.maps.LatLng(37.5279521,126.8964107), //
    new kakao.maps.LatLng(37.5278900,126.8963107), // 도착
    new kakao.maps.LatLng(37.5276053,126.8960481) //웨스턴베니비스 좌표
];

// 지도에 표시할 선을 생성합니다
var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: '#FFAE00', // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
});
// 지도에 선을 표시합니다
polyline.setMap(map);

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
