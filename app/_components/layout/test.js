!(function (e) {
    var o, t, n, d, i, r;
    function a(e, o) {
        o = new RegExp('"' + e + '":s?"?([^,"}]+)"?', "gm").exec(o);
        return o ? o[1] : "";
    }
    document.getElementById("looxOverlay") ||
        ((o = document.body),
        ((t = document.createElement("div")).id = "looxOverlay"),
        (t.style.cssText =
            "width: 100%;height:100%; position:fixed; font-family: Arial, Helvetica, sans-serif;top: 0;right: 0;bottom: 0;left: 0;z-index: 9999999999;opacity: 1;-webkit-transition: opacity 400ms ease-in;-moz-transition: opacity 400ms ease-in;transition: opacity 400ms ease-in;background: rgba(238, 238, 238, 0.9);"),
        (n = e + "/admin/reviews/import/url?id=_ds3u2U2Fz.5efe65e9c80b7c949f937daea9461111"),
        (n += "&url=" + encodeURIComponent(window.location.href)),
        (r = (/productEvaluation\.htm\?productId=.+\"/gi.exec(document.body.innerHTML) || [])[0] || ""),
        (i = /ownerMemberId=(\d+)/.exec(r) || []),
        (d = /productId=(\d+)/.exec(r)),
        (e = i ? i[1] : ""),
        (r = d ? d[1] : ""),
        (i = "default"),
        ((d = "object" == typeof runParams && runParams.data ? runParams.data : {}).feedbackModule || {})
            .sellerAdminSeq && (d.feedbackModule || {}).productId
            ? ((d = d.feedbackModule), (i = "runParam - feedbackModule"))
            : d.adminSeq && d.productId
            ? ((d = { sellerAdminSeq: d.adminSeq, productId: d.productId }), (i = "runParam - root"))
            : (d.storeModule || {}).sellerAdminSeq && (d.storeModule || {}).productId
            ? ((d = d.storeModule), (i = "runParam - storeModule"))
            : (d.productInfoComponent || {}).adminSeq &&
              (d.productInfoComponent || {}).idStr &&
              ((d = { sellerAdminSeq: d.productInfoComponent.adminSeq, productId: d.productInfoComponent.idStr }),
              (i = "runParam - productInfoComponent")),
        d.sellerAdminSeq && d.productId
            ? ((e = d.sellerAdminSeq), (r = d.productId))
            : "number" == typeof window.adminAccountId
            ? ((i = "adminAccountId"),
              (e = window.adminAccountId),
              (r = /\/item\/(\d+)/gi.exec(window.location.pathname)[1]))
            : window._dida_config_ &&
              window._dida_config_._init_data_ &&
              ((i = "_dida_config_"),
              (e = a("sellerAdminSeq", (d = JSON.stringify(window._dida_config_._init_data_)))),
              (r = a("productId", d))),
        (n += "&paramsSource=" + encodeURIComponent(i)),
        e && (n += "&ownerMemberId=" + encodeURIComponent(e)),
        r && (n += "&productId=" + encodeURIComponent(r)),
        (t.innerHTML =
            "<iframe src='" +
            n +
            "' style='width:100%;height:100%;margin:0 auto;background-color:transparent;border:0;'></iframe>"),
        (t.innerHTML +=
            "<div id='looxClose' style='color:#424242; line-height:24px; position:absolute; right: 50px; text-align:center; top: 25px; width:24px; text-decoration:none; font-weight:bold; cursor:pointer; font-size:44px;'>&times;</div>"),
        (o.style.overflow = "hidden"),
        o.appendChild(t),
        (document.getElementById("looxClose").onclick = function () {
            t.parentNode.removeChild(t), (o.style.overflow = "auto");
        }),
        window.addEventListener(
            "message",
            function (e) {
                var o = "object" == typeof e.data ? e.data : {};
                "looxCloseButtonVisibility" !== o.type ||
                    ((e = document.getElementById("looxClose")) &&
                        (o.visible ? (e.style.display = "block") : (e.style.display = "none")));
            },
            !1
        ));
})("https://loox.io");
