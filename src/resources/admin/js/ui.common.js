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
          if (id === 'test') {
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
        date: 'YYYY-MM-DD',
        min: 'YYYY-MM-DD',
        max: 'YYYY-MM-DD',
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
    const tabs = document.querySelectorAll('.ui-tab[data-id');

    tabs.forEach((tab) => {
      const id = tab.dataset.id;

      UI.tab.init({
        id,
        current: Number(tab.dataset.current) || 0,
        dynamic: tab.dataset.dynamic === 'true',
      });
    });
  });
})(window, document);

$(document).on('click', '.menu', function () {
  $(this).toggleClass('open');
  $('.sub-nav').toggleClass('is-active');
});

var $menu =
  '<button type="button" class="menu"><span class="hide">메뉴</span></button>' +
  '<ul class="nav">' +
  '  <li>' +
  '    <a href="#" id="menu1" class="mMenu">회원관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>회원관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>관리자관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>코드관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>알림관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>알림발송관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>게시판관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>금칙어관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu2">전문가관리</a>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu3">역량관리</a>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu4">모듈관리</a>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu5" class="mMenu">교육자원아카이브</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>콘텐츠관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>카테고리관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>저작권관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>라이프사이클관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>폐기대상관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu6" class="mMenu">사이트관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>팝업관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>공지사항</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>FAQ</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>Q&A</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu7" class="mMenu">공동체관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>협업공간관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>실행나눔관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>연구지원관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>학습공동체채널관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu8" class="mMenu">데이터연계</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>유튜브채널관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>유튜브수집동영상</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>연계로그관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '  <li>' +
  '    <a href="#" id="menu9" class="mMenu">포인트관리</a>' +
  '    <ul class="sub">' +
  '      <li>' +
  '        <a href="#"><span>적립기준설정</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>발급분석</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>예산관리</span></a>' +
  '      </li>' +
  '      <li>' +
  '        <a href="#"><span>정산관리</span></a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '</ul>  ';
