
$(document).ready(function () {
    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();
    // $("table").mousemove(function(e){
    //     console.log(e.pageX+", "+e.pageY)
    //   })
    // $('tr').mouseenter(function(){
    //     $(this).addClass('hoverColor')
    // }).mouseleave(function(){
    //     $(this).removeClass('hoverColor')
    //     console.log('this',this)
    // });
    // $('button').addClass('btn');
    // 新增按鈕
    // $("#addbutton").click(function () {
    //     $("#dialog-addconfirm").dialog({
    //         resizable: true,
    //         height: $(window).height() * 0.4,// dialog視窗度
    //         width: $(window).width() * 0.4,
    //         modal: true,
    //         buttons: {
    //             // 自訂button名稱
    //             "新增": function (e) {
    //                 var url = "ajax/ajaxCard";
    //                 var cnname = $("#addcnname").val();
    //                 var enname = $("#addenname").val();
    //                 var sex = $('input:radio:checked[name="addsex"]').val();
    //                 var ajaxobj = new AjaxObject(url, 'json');
    //                 ajaxobj.cnname = cnname;
    //                 ajaxobj.enname = enname;
    //                 ajaxobj.sex = sex;
    //                 ajaxobj.add();
    //                 e.preventDefault(); // avoid to execute the actual submit of the form.
    //             },
    //             "重新填寫": function () {
    //                 $("#addform")[0].reset();
    //             },
    //             "取消": function () {
    //                 $(this).dialog("close");
    //             }
    //         }
    //     });
    // })
    // 搜尋按鈕
    $("#searchbutton").click(function () {
        $("#dialog-searchconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,// dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "搜尋": function (e) {
                    var url = "ajax/ajaxCard";
                    // var data = $("#searchform").serialize();
                    var cnname = $("#secnname").val();
                    var enname = $("#seenname").val();
                    var sex = $('input:radio:checked[name="sesex"]').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.search();
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {
                    $("#searchform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    // 修改鈕
    $("#cardtable").on('click', '.modifybutton', function () {
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.modify_get();
        console.log('ajaxobj',ajaxobj);
    })
    $("#cardtable").on('click', '.deletebutton', function () {
        var deleteid = $(this).attr('id').substring(12);
        var url = "ajax/ajaxCard";
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.id = deleteid;
        ajaxobj.delete();
    })

    // 自適應視窗
    $(window).resize(function () {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);
    });
});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(strsex));
        // row.append($('<td></td>')).html(item.eMail);
        row.append($("<td></td>").html(`<div id="modifybutton" class="phone" style="font-size:16px;" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">0912345678 <span class="glyphicon glyphicon-list-alt"></span></div>`));
        row.append($("<td></td>").html('<div id="modifybutton'+'" class="eMail" style="font-size:16px;">obj.mail@gmail.com <span class="glyphicon glyphicon-list-alt"></span></div>'));
        row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '" class="modifybutton btn-secondary btn" style="font-size:16px;" data-target="#modifyBtn" data-toggle="modal">修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td></td>").html('<button id="deletebutton'  + item.s_sn + '" class="deletebutton btn btn-danger" style="font-size:16px;" data-target="#deleteBtn" data-toggle="modal">刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
        // row.append($("<td></td>").html(`<button id="deletebutton'  ${item.s_sn}  class="deletebutton btn btn-danger" style="font-size:16px;font-weight:bold;"  data-toggle="modal" data-target='#deleteBtn'>刪除 <span class="glyphicon glyphicon-trash"></span></button>`));
        $("#cardtable").append(row);
    });
}
$(this).mouseenter(function(){
    console.log($('this').attr('html'))
})

function initEdit(response) {
  var modifyid = $("#cardtable").attr('id').substring(12);
  $("#mocnname").val(response[0].cnname);
  $("#moenname").val(response[0].enname);
  if (response[0].sex == 0) {
      $("#modifyman").prop("checked", true);
      $("#modifywoman").prop("checked", false);
  }
  else {
      $("#modifyman").prop("checked", false);
      $("#modifywoman").prop("checked", true);
  }
  $("#modifysid").val(modifyid);
  $("#dialog-modifyconfirm").dialog({
      resizable: true,
      height: $(window).height() * 0.4,// dialog視窗度
      width: $(window).width() * 0.4,
      modal: true,
      buttons: {
          // 自訂button名稱
          "修改": function (e) {
            //   $("#modifyform").submit();
              var url = "ajax/ajaxCard";
              var cnname = $("#mocnname").val();
              var enname = $("#moenname").val();
              var sex = $('input:radio:checked[name="mosex"]').val();
              var ajaxobj = new AjaxObject(url, 'json');
              ajaxobj.cnname = cnname;
              ajaxobj.enname = enname;
              ajaxobj.sex = sex;
              ajaxobj.id = modifyid;
              ajaxobj.modify();

              e.preventDefault(); // avoid to execute the actual submit of the form.
          },
          "重新填寫": function () {
              $("#modifyform")[0].reset();
          },
          "取消": function () {
              $(this).dialog("close");
          }
      },
      error: function (exception) { alert('Exeption:' + exception); }
  });
}