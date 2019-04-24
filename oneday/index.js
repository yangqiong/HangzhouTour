
document.body.height = window.innerHeight;
document.getElementById("spots").style.height = window.innerHeight - window.innerWidth + "px";

let $map = document.getElementById("map");
$map.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, {passive: false}); //passive 参数不能省略，用来兼容ios和android


let map = new AMap.Map('map', {
    zoom: 14, center: [120.168280,30.248148],
});

// 标记点
let masses = [];

let markers = window.spots.map(function(spot){
    let location = spot.location.split(",");
    return new AMap.Marker({
        position: new AMap.LngLat(location[0], location[1]),
        title: spot.name
    });
})

for (let marker of markers){
    map.add(marker);
}

let $spots = window.spots.map(function(spot){
    return `
    <div class="spot">
        <div>${spot.name}</div>
        <a class="icon-wrap" href=${spot.dianping} target="_blank">
            <div>大众点评</div>
            <image class="icon" src="arrow.png" />
        </a>
    </div>
    `
}).join("")

document.getElementById("spots").innerHTML = $spots;

var tempMaker;

document.getElementById("spots").addEventListener('click' , function(event){
    debugger
    var el = event.target;
    if (el.parentElement.classList.contains("spot")){
        el = el.parentElement;
    }
    if (el.classList.contains("spot")){
        var index = Array.from(el.parentElement.children).indexOf(el);
        var location = window.spots[index].location.split(",");
        if (tempMaker){
            map.remove(tempMaker);
        }
        tempMaker = new AMap.Marker({
            position: new AMap.LngLat(location[0], location[1]),
            icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
        });
        map.add(tempMaker)
    }
}, true)

