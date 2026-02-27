// main.js - Protótipo Aegea
// Requer jQuery (presente no template de referência)

$(document).ready(function() {
  // Validação básica de formulários
  $("form[aria-label]").on("submit", function(e) {
    var valido = true;
    $(this).find("[required]").each(function() {
      if (!$(this).val()) {
        $(this).addClass("erro-campo");
        valido = false;
      } else {
        $(this).removeClass("erro-campo");
      }
    });
    if (!valido) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
  });

  // Exibição de modais
  $("[data-modal]").on("click", function(e) {
    e.preventDefault();
    var alvo = $(this).data("modal");
    $(alvo).fadeIn(150);
    $(alvo).attr("aria-hidden", "false");
    $(alvo).find(".close-modal").focus();
  });
  $(".close-modal").on("click", function() {
    $(this).closest(".modal").fadeOut(150).attr("aria-hidden", "true");
  });
  $(".modal").on("click", function(e) {
    if ($(e.target).hasClass("modal")) {
      $(this).fadeOut(150).attr("aria-hidden", "true");
    }
  });

  // Navegação entre seções (exemplo para tabs)
  $("[data-toggle='tab']").on("click", function(e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $(this).addClass("active").siblings().removeClass("active");
    $(target).show().siblings(".tab-pane").hide();
  });

  // Acessibilidade: skip link
  $(".skip-link").on("click", function(e) {
    var id = $(this).attr("href");
    $(id).attr("tabindex", -1).focus();
  });
});

// Estilo de erro para campos obrigatórios
$("<style>.erro-campo{border-color:#cf2e2e !important;}</style>").appendTo("head");
