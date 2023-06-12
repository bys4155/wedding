document.addEventListener("DOMContentLoaded", function(){
    Kakao.init('e7baf846ee0f2df60d24b7d1c943c562');
});
var kakaoNavi = {
     my1 : function () {
         Kakao.Navi.start({
             name:"에이치피오 에이치커피",
             x: 37.52831042067139,
             y: 126.89654331115185,
             coordType:'wgs84'
         })
     }
}
var kakaoMap = {
    map : null,
    mapContainer : document.getElementById('map'),    // 지도를 표시할 div
    mapOption : {
        //center: new kakao.maps.LatLng(37.5276053,126.8960481), // 웨스턴베니비스 지도의 중심좌표
        center: new kakao.maps.LatLng(37.52774064441032,126.89666571435401), // 웨스턴베니비스 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    },
    positions : [
        {
            content: '<div>웨스턴 베니비스 웨딩홀</div>',
            latlng: new kakao.maps.LatLng(37.5276053,126.8960481)
        },
        {
            content: '<div>고객전용 주차장</div>',
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
        //new kakao.maps.LatLng(37.5276053,126.8960481)  //웨스턴베니비스 좌표
    ],
    subwayLinePath : [
       // new kakao.maps.LatLng(37.5267676,126.8967851), //3번출구
       // new kakao.maps.LatLng(37.5271281,126.8968981),
        //new kakao.maps.LatLng(37.5273030,126.8958800),
       // new kakao.maps.LatLng(37.527424668509454,126.89595342516084)
        //new kakao.maps.LatLng(37.5276053,126.8960481)  //웨스턴베니비스 좌표

    ],
    init : function() {
        this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);
        this.map.setDraggable(false);
        //this.setMarker();       //기본 마커 설정
        //this.setStartMarker(37.5283421,126.8967907); //출발 마커 (외부 주차장)
        //this.setStartMarker(37.52677663325741,126.89673492210247); //출발 마커 (지하철 역)
        //this.setArriveMarker(37.52783925817492,126.8960999203837); //도착 마커
        this.setParkingMarker(37.5283421,126.8967907);
        this.setOneTemplateMarker(37.52770404838053,126.8960322290881);
        this.setCustomOverlay(); // 주차장 커스텀 오버레이
        this.setParkingLine();  //주차장에서 오는길 라인
        this.setSubwayLine(); //지하철역에서 오는길 라인
    },
    setMarker : function (){
        for (var i = 0; i < this.positions.length; i ++) {
            var _self = this;
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: this.map, // 마커를 표시할 지도
                position: this.positions[i].latlng, // 마커의 위치
                zIndex:4
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
    setOneTemplateMarker : function(x,y) {
        var startSrc = '/wedding/image/map/one_template.gif', // 출발 마커이미지의 주소입니다
            startSize = new kakao.maps.Size(72, 68),
            startOption = {
                offset: new kakao.maps.Point(35, 20)
            };
        var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);
        var startPosition = new kakao.maps.LatLng(x,y);
        var startMarker = new kakao.maps.Marker({
            map: this.map,
            position: startPosition,
            draggable: false,
            image: startImage
        });
    },
    setParkingMarker : function (x, y) {
        var startSrc = '/wedding/image/map/park_pin.png', // 출발 마커이미지의 주소입니다
            startSize = new kakao.maps.Size(30, 45), // 출발 마커이미지의 크기입니다
            startOption = {
                offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };
        // 출발 마커 이미지를 생성합니다
        var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);
        // 출발 마커가 표시될 위치입니다
        var startPosition = new kakao.maps.LatLng(x,y);
        // 출발 마커를 생성합니다
        var startMarker = new kakao.maps.Marker({
            map: this.map, // 출발 마커가 지도 위에 표시되도록 설정합니다
            position: startPosition,
            draggable: false, // 출발 마커가 드래그 가능하도록 설정합니다
            image: startImage // 출발 마커이미지를 설정합니다
        });
    },
    setStartMarker : function (x, y) {
        var startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소입니다
            startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
            startOption = {
                offset: new kakao.maps.Point(15, 43) // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };
        // 출발 마커 이미지를 생성합니다
        var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);
        // 출발 마커가 표시될 위치입니다
        var startPosition = new kakao.maps.LatLng(x,y);
        // 출발 마커를 생성합니다
        var startMarker = new kakao.maps.Marker({
            map: this.map, // 출발 마커가 지도 위에 표시되도록 설정합니다
            position: startPosition,
            draggable: false, // 출발 마커가 드래그 가능하도록 설정합니다
            image: startImage // 출발 마커이미지를 설정합니다
        });
    },
    setArriveMarker : function (x, y) {
        var arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소입니다
            arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
            arriveOption = {
                offset: new kakao.maps.Point(15, 43) // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
            };
        // 도착 마커 이미지를 생성합니다
        var arriveImage = new kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);
        // 도착 마커가 표시될 위치입니다
        var arrivePosition = new kakao.maps.LatLng(x,y);
        // 도착 마커를 생성합니다
        var arriveMarker = new kakao.maps.Marker({
            map: kakaoMap.map, // 도착 마커가 지도 위에 표시되도록 설정합니다
            position: arrivePosition,
            draggable: false, // 도착 마커가 드래그 가능하도록 설정합니다
            image: arriveImage // 도착 마커이미지를 설정합니다
        });
    },
    setUnlockToggle : function () {
        var control = document.getElementById('mapControl');
        var cover = document.getElementById('mapCover');
        var isChk =  this.map.getDraggable();
        if(isChk) {
            control.className = '';
            cover.style = 'z-index:2';
            this.map.setDraggable(false);
        } else {
            control.className = 'active';
            cover.style = 'z-index:1';
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
    setSubwayLine : function () {
        var polyline = new kakao.maps.Polyline({
            path: this.subwayLinePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#2C0051', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        polyline.setMap(this.map);
    },
    setCustomOverlay : function () {
        new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(37.5283421,126.8967907),
            content: '<div class="customoverlay" style="z-index: 3">' +
                // '  <a href="https://map.kakao.com/link/map/1647687761" target="_blank">' +
                '  <a>' +
                '    <span class="title">웨딩고객 전용 주차장<br>(삼성생명빌딩)</span>' +
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


var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: kakaoMap.map.getCenter()
});
kakao.maps.event.addListener(kakaoMap.map, 'click', function(mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ',';
    message += '' + latlng.getLng() + ' 입니다';

    var resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;

});



