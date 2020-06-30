function deleteajax(id) {
    if (confirm("삭제 하시겠습니까?")) {
        $.ajax({
            url: '/country/' + id,
            method: "DELETE",
        }).done(function (response) {
            location.href = "/";
        });
    }
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
  }
