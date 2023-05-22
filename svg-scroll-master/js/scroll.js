const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li");
let posArr = [];
const base = -200;

//section의 갯수만큼 반복을 돌면서 해당 section의 세로 위치값을 전역변수 배열에 저장
for (let section of sections) posArr.push(section.offsetTop);

//브라우저 스크롤시 버튼활성화
window.addEventListener("scroll", e => {
   let scroll = window.scrollY || window.pageYOffset;

   sections.forEach((el, index) => {
      //모든 박스의 세로 위치영역에 공통 버튼, 박스 활성화
      if (scroll >= posArr[index] + base) {
         for (let num = 0; num < sections.length; num++) {
            lis[num].classList.remove("on");
            sections[num].classList.remove("on");
         }
         lis[index].classList.add("on");
         sections[index].classList.add("on");
      }
   })

   // 4번째 스크롤 박스의 영역을 SVG 커스텀
   if (scroll >= posArr[3]) {
      // 기본 스크롤 값에 현재 박스의 offsetTop 값을 뺀 값
      let catScroll = scroll - posArr[3];
      catScroll *= 4; // 선이 그어지는 속도를 4배 빠르게 한다
      if (catScroll >= 2200) catScroll = 2200;

      // 스크롤 값을 연동해서 최종적으로는 CSS의
      // stroke-dashoffset를 0으로 변화시켜주면서 
      // 스크롤 값과 연동되어 그려지게 한다

      let path = sections[3].querySelector("path");
      path.style.strokeDashoffset = 2200 - catScroll;
   } else {
      let path = sections[3].querySelector("path");
      path.style.strokeDashoffset = 2200;
   }



});

//버튼 클릭시 세로 스크롤 이동
lis.forEach((li, index) => {
   li.addEventListener("click", e => {

      new Anim(window, {
         prop: "scroll",
         value: posArr[index],
         duration: 500
      })
   })
})

