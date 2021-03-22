function totalQuantity() {
    var result = 0;
    if (sessionStorage.length == 0) {
        return result;
    }
    else {
        for (var i = 0; i < sessionStorage.length; i++) {
            var x = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
            result += x.quantity;
        }
    }
    return result;
}
function clearSessionStorage() {
    sessionStorage.clear();
}
function addtoshoppingCart() {
    if (sessionStorage.length == 0) {
    }
    else {
        for (var i = 0; i < sessionStorage.length; i++) {
            var x = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
            var table = document.getElementById("table");
            console.log(table);
            var body = table.getElementsByTagName("tbody")[0];
            var row = body.insertRow(-1);
            row.insertCell(0).innerHTML = '<th scope="row" class="border-0"> <div class="p-2"> <img src=' + x.productImage + ' alt="" width="200" height="200" class="img-fluid rounded shadow-sm"> <div class="ml-3 d-inline-block align-middle"> <h5 class="mb-0">' + x.productBrand + ' </h5> <span class="text-muted font-weight-normal font-italic d-block">' + x.productName + '</span> </div> </div> </th>';
            row.insertCell(1).innerHTML = '<td class="border-0 align-middle"><strong>' + x.productPrice + '</strong></td>';
            row.insertCell(2).innerHTML = '<td class="border-0 align-middle"><strong>' + x.quantity + '</strong></td>';
        }
    }
}
function price(quantity, price) {
    return quantity * (parseFloat(price.replace("$", "")));
}
function checkOut() {
    var subtotal = 0;
    if (sessionStorage.length == 0) {
    }
    else {
        for (var i = 0; i < sessionStorage.length; i++) {
            var x = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
            var table = document.getElementById("table");
            console.log(table);
            var body = table.getElementsByTagName("tbody")[0];
            var row = body.insertRow(-1);
            row.insertCell(0).innerHTML = '<th scope="row" class="border-0">  </h5> <span class="text-muted font-weight-normal font-italic d-block">' + x.productName + '</span>  </th>';
            row.insertCell(1).innerHTML = '<td class="border-0 align-middle"><strong>' + x.quantity + '</strong></td>';
            var total = price(x.quantity, x.productPrice);
            subtotal += total;
            row.insertCell(2).innerHTML = '<td class="border-0 align-middle"><strong>' + total + '</strong></td>';
        }
    }
    var mysubtotal = document.getElementById('subtotal');
    var mytax = document.getElementById('tax');
    var mytotal = document.getElementById('total');
    mysubtotal.innerHTML = subtotal.toString();
    mytax.innerHTML = (subtotal * 0.065).toString();
    mytotal.innerHTML = (subtotal + (subtotal * 0.065)).toString();
}
function storeToSession(e) {
    var div_element = document.getElementById(e);
    var c = div_element.children;
    if (sessionStorage.getItem(e)) {
        newProduct = JSON.parse(sessionStorage.getItem(e));
        newProduct.quantity = newProduct.quantity + 1;
        sessionStorage.setItem(e, JSON.stringify(newProduct));
    }
    else {
        var newProduct = {
            productImage: c[0].getAttribute('src'),
            productBrand: c[1].textContent,
            productName: c[2].textContent,
            productPrice: c[3].textContent,
            quantity: 1
        };
        sessionStorage.setItem(e, JSON.stringify(newProduct));
    }
}
