/*jshint esversion: 6 */
'use strict;';

(function() {

$.fn.popup = function() { 	
    this.css('position', 'absolute').fadeIn();	
    
    this.css('top', ($(window).height() - this.height()) / 2 + $(window).scrollTop() + 'px');
    
    this.css('left', ($(window).width() - this.width()) / 2  + 'px');
    
    $('.backpopup').fadeIn();
};

function sort() {
    $.ajax({
        url: window.location.href,
        type: 'GET',
        success: function(res) {
            let sortedTable = $(res);
            for (var i = 0; i < sortedTable.length; i++) {
                if (sortedTable[i].className === 'table') {
                    $('table.table tbody').remove();
                    $('table.table').append(sortedTable[i].getElementsByTagName('tbody'));
                    break;
                }
            }
            return false;
        },
        
        error: function(xhr, status, error){     
            showErrors(xhr);
        }
    });
}
$(document).ready(function() { 
    
    let previousTarget = 'firstClick';


    $('.backpopup,.close,.cancel').on('click', function() { 
        $('.page-data, .page-edit, .backpopup').fadeOut();
    });

    $('.table thead').on('click', function(event) {
        let target = event.target,
            innerText = target.textContent,
            setClasses = (remClass, addClass) => {
                history.replaceState({}, addClass, "?sort=" + innerText + "_" + addClass);
                sort(innerText, addClass);
                target.classList.add(addClass);
                target.classList.remove(remClass);
                previousTarget = target;
            };
            

        if (target.tagName === "TH") {
            if (previousTarget === 'firstClick' || previousTarget === target) {
                setClasses = (target.className === "asc") ? setClasses('asc', 'desc') : setClasses('desc', 'asc');
            }
            else {
                previousTarget.classList.remove('desc', 'asc');
                setClasses('desc', 'asc');
            }
        }
    });
});
})();

function showErrors(xhr) {
    console.log(xhr.responseText);
    let err = '';
    $.each(JSON.parse(xhr.responseText), function(i, item) {
        err +='<li>'+item.msg+'</li>';
    });
    $(".err-area").html(err);    
    return false;
}

function deleteUser(id){
    $.ajax({
        url: "/" + id,
        type: 'delete',
        success: function(res) {
        window.location.reload();
        return false;
        },
        error:function(xhr, status, error){
        showErrors(xhr);
        }
    });
}

function getEditData(event) {
    let currentRow = $(event.target).closest("tr").find('td'),
        currentTh = $('.table thead').find('th'),
        dataRow = {},
        id = '';
    for (let i = 1; i < currentRow.length - 1; i++) {
        $("table.edit-table input[name='" + currentTh[i].textContent + "']" ).val(currentRow[i].textContent);
        (dataRow[currentTh[i].textContent] = currentRow[i].textContent);
    }
    id = currentRow[0].textContent;
    //my stop
    $('#the-edit-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            url:"/" + id,
            type:"put",
            data: $("#the-edit-form").serialize(),
            success:function(res){
                $('.page-edit, .backpopup').fadeOut();
                $('#update').removeClass('denial').addClass('success').html("Data have been updated successfully");
                $('#the-edit-form').unbind('submit');
                return false;
            },
            error:function(xhr, status, error){
                $('#update').removeClass('success').addClass('denial').html("Data haven't been updated");
                $('#the-edit-form').unbind('submit');
                showErrors(xhr);
            }
        });
    });
}

function openEdit(event) {
    if ($(event.target).hasClass('edit', 'open')) {
            getEditData(event);
            $('.page-edit').popup();
        } 
    else {
        $('.page-data').popup();
    }
}

$('#the-add-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
        url:"/add",
        type:"post",
        data:$("#the-add-form").serialize(),
        success: function(data){
            $('.page-data, .backpopup').fadeOut();
            window.location.reload();
            return false;
        },
        error:function(xhr, status, error){
            showErrors(xhr);
        }
    });
});
