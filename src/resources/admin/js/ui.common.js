(function (win, doc, undefined) {
  'use strict';

  var $WIN = $(window);
  var $DOC = $(document);

  UI.common = {
    init: function () {
      UI.common.subNav();
      UI.table.scroll();

      // 모달 호출
      const btns = document.querySelectorAll('.btn-modal');

      UI.scrollBar.init({
        callback: function () {
          // console.log('end');
        },
      });

      for (const btn of btns) {
        btn.addEventListener('click', (e) => {
          const el = e.currentTarget;
          const id = el.dataset.id;
          const src = el.dataset.src;

          // callback 함수 필요할경우
          if (id === 'sampleModal') {
            UI.modal.show({
              id: id,
              src: src,
              callback: () => {
                alert(11);
                setTimeout(() => {
                  UI.datepicker.init();
                }, 0);
              },
            });
          } else {
            UI.modal.show({
              id: id,
              src: src,
              callback: () => {
                UI.datepicker.init();
              },
            });
          }
        });
      }

      UI.datepicker.init({
        id: 'input id name',
        date: 'YYYY.MM.DD',
        min: 'YYYY.MM.DD',
        max: 'YYYY.MM.DD',
        title: 'title name',
        //period: 'start' or 'end',
        // callback: function(){
        // 	console.log('callback init');
        // }
      });

      UI.form.fileUpload();
    },
    subNav: function () {
      if ($('.sub-nav').length > 0) {
        var lnbObj = $('.sub-nav');
        $('.sub-nav').html($menu);
        var mid = pageInfo.mid,
          sid = !!pageInfo.sid ? pageInfo.sid : '',
          mMenuObj = $('#menu' + mid),
          sMenuObj = mMenuObj
            .next('.sub')
            .find('li')
            .eq(sid - 1);
        mMenuObj.addClass('on');
        mMenuObj.next('.sub').addClass('on');
        sMenuObj.addClass('current');

        $('.sub-nav')
          .find('.mMenu')
          .on('click', function (e) {
            e.preventDefault();
            var subMenu = $(this).closest('li').find('.sub');
            if (subMenu.length > 0 && !!!subMenu.hasClass('on')) {
              $('.nav > li').find('.mMenu').removeClass('on');
              $('.sub').removeClass('on').slideUp(200);

              if (!!!$(this).closest('li').find('.sub').hasClass('on')) {
                $(this).addClass('on');
                subMenu.addClass('on').slideDown(200);
              }
            }
          });
      }
    },
  };

  //기본실행
  doc.addEventListener('DOMContentLoaded', function () {
    UI.common.init();
  });
})(window, document);

$(document).on('click', '.menu', function () {
  $(this).toggleClass('open');
  $('.sub-nav').toggleClass('is-active');
});

var $menu =
  '<ul class="nav">' +
  '  <li>' +
  '    <a href="#" id="menu1" class="mMenu">회원관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>회원관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>관리자</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>관리자 권한관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu2" class="mMenu">역량관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>설문지 관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>역량관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu3" class="mMenu">콘텐츠 관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>콘텐츠</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>콘텐츠 활용현황</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>콘텐츠 평가관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="3"><span>콘텐츠신고관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu4" class="mMenu">모듈관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>모듈관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>모듈현황</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>모듈평가관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>모듈신고관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu5" class="mMenu">전문가관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>전문가관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>전문가 평가관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>전문가신고관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>전문가활동현황</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>자동등재관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>등재요청관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu6" class="mMenu">공동체관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>공동체관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공동체현황</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공동체개설요청관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공동체활동관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공동체 게시판 관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu7">코드관리</a>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu8" class="mMenu">아카이브</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>콘텐츠등록</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>연계콘텐츠관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>메타정보관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>저자권관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>라이프사이클관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>뷰어관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu9" class="mMenu">사이트관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>팝업관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공지사항관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>FAQ 관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>Q&A 관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '</ul>  ';
