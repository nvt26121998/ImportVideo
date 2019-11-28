$(document).ready(function () {
    let columnDefinitions = [
        {
            "data": null,
            "class": "text-center"
        },
        {
            "data": "id",
            "class": "text-center"
        },
        {
            "data": "url",
            "class": "text-center"
        },
        {
            "data": "startDate",
            "class": "text-center"
        },
        {
            "data": "finishDate",
            "class": "text-center"
        },
        {
            "data": "createdTime",
            "class": "text-center"
        },
        {
            "data": "updatedTime",
            "class": "text-center"
        }
    ];

    let getData = function (requestData, renderFunction) {
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
        };
        jQuery.get("/api/v1/video/list", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
        });
    };

    let table = $("#table").DataTable({
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "serverSide": true,
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (requestData, renderFunction) {
            getData(requestData, renderFunction);
        },
        columnDefs: [{
            "render": function (data) {
                return '<button id="' + data.id + '" class="btn btn-info btn-sm btn-edit action-btn" data-toggle="modal" data-target="#edit_modal">Edit</button>' +
                    '<button id="' + data.id + '" class="btn btn-success btn-sm btn-add action-btn" data-toggle="modal" data-target="#add_new_modal">AddNew</button>' +
                    '<button id="' + data.id + '" class="btn btn-danger btn-sm btn-delete" data-toggle="tooltip" data-target="#delete_modal" data-placement="bottom">Delete</button>';
            },
            targets: 0
        },
            {
                "targets": [1],
                "visible": false
            },
            {
                "targets": [5],
                "visible": false
            },
            {
                "targets": [6],
                "visible": false
            }
        ],
        // "order": [
        //     [0, "asc"]
        // ]
    });

    // CREATE NEW

    $(document).on("click", "#id_btn_add", function (e) {
        e.preventDefault();
        let video = {
            "url": $('#url').val(),
            "startDate": $('#start_date').val(),
            "endDate": $('#end_date').val()
        };

        $.ajax({
            url: "/api/v1/video/create",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(video),
            error: function () {
                window.component.alert.show("error", "Error", 2000);
            },
            success: function (data) {
                console.log(data);
                window.component.alert.show("success", "Success", 1000);
                table.ajax.reload();
            }
        });
    });

    // DELETE
    $(document).on("click", ".btn-delete", function () {
        result_confirm = confirm("Are you sure want to DELETE this VIDEO");
        if (result_confirm == true) {
            $.ajax({
                url: "/api/v1/video/delete/" + $(this).attr('id'),
                type: 'DELETE',
                error: function () {
                    window.component.alert.show("error", "Error", 2000);
                },
                success: function () {
                    window.component.alert.show("success", "Success", 2000);
                    table.ajax.reload();
                }
            });
        } else {
            //do something
        }
    });

    // EDIT
    $(document).on("click", ".btn-edit", function () {
        $.ajax({
            url: "/api/v1/video/" + $(this).attr('id'),
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            error: function () {
                window.component.alert.show("error", "Error", 2000);
            },
            success: function (data) {
                console.log(data);
                $('#url_edit').val(data.url);
            }
        });
    });

    // // UPDATE
    // $(document).on("click", "#id-btn-update", function () {
    //     let department = {
    //         "id": $('#id_edit').val(),
    //         "name": $("#name_edit").val(),
    //         "description": $("#description_edit").val(),
    //     };
    //
    //     $.ajax({
    //         url: "/api/v1/department/update",
    //         type: 'PUT',
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify(department),
    //         error: function () {
    //             window.component.alert.show("error", "Error", 2000);
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             window.component.alert.show("success", "Success", 1000);
    //             table.ajax.reload();
    //         }
    //     });
    // });

    //Datepicker
    $('#start_date').datepicker({
        uiLibrary: 'bootstrap4',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true
    });
});