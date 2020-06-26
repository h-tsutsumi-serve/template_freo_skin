/*********************************************************************

 freo | 管理画面 (2018/05/27)

 Copyright(C) 2009-2018 freo.jp

*********************************************************************/

$(document).ready(function() {
  //メディア管理
  $("#media").tablesorter({
    headers: {
      2: { sorter: 'digit' },
      3: { sorter: false },
      4: { sorter: false }
    }
  });

  //メディアアップロード欄追加
  $('#media_add').click(function() {
    $('#media_file').append($('#media_template').html());
  });
  $('#media_template').hide();

  //メディア挿入準備
  $('a.colorbox').click(function() {
    if (tinymce.isIE) {
      tinyMCE.get('tiny_mce').focus();
      tinyMCE.activeEditor.windowManager.bookmark = tinyMCE.activeEditor.selection.getBookmark();
    }
  });

  //公開終了
  if ($('#article_close_set').val() == '0') {
    $('#article_close').hide();
  }
  $('#article_close_set').change(function() {
    if ($(this).val() == '1') {
      $('#article_close').show();
    } else {
      $('#article_close').hide();
    }
  });

  //閲覧制限
  if ($('#article_restriction').val() == 'group') {
    $('#article_password').hide();
  } else if ($('#article_restriction').val() == 'password') {
    $('#article_group').hide();
  } else {
    $('#article_group, #article_password').hide();
  }
  $('#article_restriction').change(function() {
    if ($(this).val() == 'group') {
      $('#article_group').show();
      $('#article_password').hide();
    } else if ($(this).val() == 'password') {
      $('#article_group').hide();
      $('#article_password').show();
    } else {
      $('#article_group, #article_password').hide();
    }
  });

  //検証
  if ($('#option_type').val() != 'text') {
    $('#option_validate').hide();
  }
  $('#option_type').change(function() {
    if ($(this).val() == 'text') {
      $('#option_validate').show();
    } else {
      $('#option_validate').hide();
    }
  });

  //承認確認
  $('a.approve').click(function() {
    return confirm('本当に承認してもよろしいですか？');
  });
  $('form.approve').submit(function() {
    return confirm('本当に承認してもよろしいですか？');
  });

  //削除確認
  $('a.delete').click(function() {
    return confirm('本当に削除してもよろしいですか？');
  });
  $('form.delete').submit(function() {
    return confirm('本当に削除してもよろしいですか？');
  });

  //設定確認
  $('a.config').click(function() {
    return confirm('本当に設定してもよろしいですか？');
  });
  $('form.config').submit(function() {
    return confirm('本当に設定してもよろしいですか？');
  });

  //ColorBox
  var extensions = ['gif', 'GIF', 'jpeg', 'JPEG', 'jpg', 'JPG', 'jpe', 'JPE', 'png', 'PNG'];

  var target = '';
  $.each(extensions, function() {
    if (target) {
      target += ',';
    }
    target += 'a[href$=\'.' + this + '\']';
  });
  $(target).colorbox();

  $('a.colorbox').colorbox({ width:'80%', height:'80%', iframe:true });
});

//TinyMCE4
tinymce.init({
  language: 'ja',
  selector: '#tiny_mce',
  entity_encoding : 'raw',
  extended_valid_elements: 'iframe[*]',
  content_css: freo_path + 'css/common.css',
  convert_urls: false,
  plugins: 'advlist image link autosave contextmenu fullscreen pagebreak searchreplace table lists charmap code media textcolor',
  menubar: 'file edit insert format table tools',
  menu: {
    file: {title: 'File', items: 'newdocument'},
    edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall searchreplace'},
    insert: {title: 'Insert', items: 'link | image media | pagebreak charmap template'},
    format: {title: 'Format', items: 'bold underline strikethrough superscript subscript | formats | removeformat'},
    table: {title: 'Table', items: 'inserttable | itableprops deletetable cell row column'},
    tools: {title: 'Tools', items: 'code fullscreen'}
  },
  toolbar1: "bold strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect | code fullscreen",
  toolbar2: "fontsizeselect | forecolor backcolor removeformat | link unlink image media charmap pagebreak | searchreplace | undo redo |",
  fontsize_formats: "10px 12px 14px 16px 18px 20px 22px",
  style_formats: [
    {title: "見出し", items: [
      {title: "見出し4", format: "h4"},
      {title: "見出し5", format: "h5"},
      {title: "見出し6", format: "h6"}
    ]},
    {title: "ブロック", items: [
      {title: "段落", format: "p"},
      {title: "引用", format: "blockquote"},
      {title: "整形済み", format: "pre"},
      {title: "コード", format: "code"},
    ]},
    {title: "配置", items: [
      {title: "左揃え", icon: "alignleft", format: "alignleft"},
      {title: "中央揃え", icon: "aligncenter", format: "aligncenter"},
      {title: "右揃え", icon: "alignright", format: "alignright"},
      {title: "均等揃え", icon: "alignjustify", format: "alignjustify"}
    ]},
  ],
});
