function deleteajax(id) {
    $.ajax({
        url: '/country/' + id,
        method: "DELETE",
    }).done(function (response) {
        location.href = "/";
    });
}