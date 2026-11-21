/**
 * vpnjichang.wiki - 全站核心交互脚本 (原生轻量 JavaScript，无外部依赖)
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. 移动端菜单折叠与展开
  var mobileToggle = document.querySelector('.mobile-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      var isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. FAQ 折叠手风琴交互
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      if (answer) {
        var isHidden = answer.style.display === 'none';
        answer.style.display = isHidden ? 'block' : 'none';
      }
    });
  });

  // 3. 机场横向比较工具逻辑 (仅在 compare 页面激活)
  var compareContainer = document.getElementById('compare-tool-root');
  if (compareContainer && window.AIRPORTS_DATA) {
    initCompareTool();
  }
});

/**
 * 机场横向对比工具逻辑
 */
function initCompareTool() {
  var airports = window.AIRPORTS_DATA || [];
  if (!airports.length) return;

  var select1 = document.getElementById('select-airport-1');
  var select2 = document.getElementById('select-airport-2');
  var select3 = document.getElementById('select-airport-3');
  var select4 = document.getElementById('select-airport-4');

  var selects = [select1, select2, select3, select4].filter(Boolean);

  // 初始化下拉框选项
  selects.forEach(function (sel, idx) {
    sel.innerHTML = '<option value="">-- 选择对比机场 --</option>';
    airports.forEach(function (ap) {
      var opt = document.createElement('option');
      opt.value = ap.id;
      opt.textContent = ap.name + ' (' + ap.startingPrice + '元/月起)';
      sel.appendChild(opt);
    });

    // 默认预选前2-3家
    if (idx === 0 && airports[0]) sel.value = airports[0].id;
    if (idx === 1 && airports[1]) sel.value = airports[1].id;
    if (idx === 2 && airports[2]) sel.value = airports[2].id;

    sel.addEventListener('change', renderCompareTable);
  });

  renderCompareTable();

  function renderCompareTable() {
    var selectedIds = selects.map(function (s) { return s.value; }).filter(Boolean);
    var selectedAirports = selectedIds.map(function (id) {
      return airports.find(function (a) { return a.id === id; });
    }).filter(Boolean);

    var container = document.getElementById('compare-table-result');
    if (!container) return;

    if (selectedAirports.length === 0) {
      container.innerHTML = '<div style="padding: 40px; text-align: center; color: #64748b;">请在上方的下拉菜单中至少选择 1 家机场开始横向对比。</div>';
      return;
    }

    var html = '<div style="overflow-x: auto;"><table class="compare-table">';
    // 表头：机场名称
    html += '<thead><tr><th>对比维度</th>';
    selectedAirports.forEach(function (ap) {
      html += '<th class="compare-col-header">' + ap.name + '</th>';
    });
    html += '</tr></thead><tbody>';

    // 行：起步价格
    html += '<tr><th>起步月付</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td><strong style="color: #2563eb; font-size: 1.1rem;">￥' + ap.startingPrice.toFixed(2) + '</strong> /月</td>';
    });
    html += '</tr>';

    // 行：入门套餐流量与单价
    html += '<tr><th>基础套餐流量与单价</th>';
    selectedAirports.forEach(function (ap) {
      var p0 = ap.plans && ap.plans[0];
      if (p0) {
        html += '<td>' + p0.trafficGB + 'GB / ' + p0.price + '元<br><small style="color: #64748b;">每GB约 ￥' + p0.pricePerGB.toFixed(3) + '</small></td>';
      } else {
        html += '<td>暂无资料</td>';
      }
    });
    html += '</tr>';

    // 行：线路与协议
    html += '<tr><th>支持协议</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.protocols || []).join(', ') + '</td>';
    });
    html += '</tr>';

    // 行：覆盖地区
    html += '<tr><th>覆盖地区</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.regions || []).join('、') + '</td>';
    });
    html += '</tr>';

    // 行：设备限制
    html += '<tr><th>设备数限制</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.deviceLimit || '尚未核实') + '</td>';
    });
    html += '</tr>';

    // 行：AI 工具解锁
    html += '<tr><th>AI 工具解锁 (ChatGPT/Claude)</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.aiSupport ? ap.aiSupport.join('、') : '支持基础网页访问') + '</td>';
    });
    html += '</tr>';

    // 行：流媒体解锁
    html += '<tr><th>4K 流媒体支持</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.streamingSupport ? ap.streamingSupport.join('、') : '基础 4K 支持') + '</td>';
    });
    html += '</tr>';

    // 行：主要优点
    html += '<tr><th>核心优势</th>';
    selectedAirports.forEach(function (ap) {
      var ads = (ap.advantages || []).map(function (a) { return '<li style="margin-bottom: 4px;">' + a + '</li>'; }).join('');
      html += '<td><ul style="padding-left: 18px; margin: 0; font-size: 0.88rem;">' + ads + '</ul></td>';
    });
    html += '</tr>';

    // 行：注意事项与缺点
    html += '<tr><th>注意事项 / 缺点</th>';
    selectedAirports.forEach(function (ap) {
      var dis = (ap.disadvantages || []).map(function (d) { return '<li style="margin-bottom: 4px; color: #b45309;">' + d + '</li>'; }).join('');
      html += '<td><ul style="padding-left: 18px; margin: 0; font-size: 0.88rem;">' + dis + '</ul></td>';
    });
    html += '</tr>';

    // 行：适合人群
    html += '<tr><th>适合人群</th>';
    selectedAirports.forEach(function (ap) {
      html += '<td>' + (ap.suitableFor || []).join('；') + '</td>';
    });
    html += '</tr>';

    // 行：操作链接
    html += '<tr><th>查看评测 / 官网</th>';
    selectedAirports.forEach(function (ap) {
      // 动态判断路径深度 (如果在根目录还是子目录)
      var isSubDir = window.location.pathname.indexOf('/compare') !== -1 && window.location.pathname.indexOf('.html') === -1;
      var prefix = ''; // 在 compare.html 时在根目录
      html += '<td><div style="display: flex; gap: 8px; flex-wrap: wrap;">' +
        '<a href="review/' + ap.slug + '.html" class="btn-card-review" style="font-size: 0.82rem;">详细评测</a>' +
        '<a href="' + ap.officialUrl + '" target="_blank" rel="noopener nofollow" class="btn-card-buy" style="font-size: 0.82rem;">前往官网</a>' +
        '</div></td>';
    });
    html += '</tr>';

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }
}
