function initSubmitNewsletter() {
    $('#newsletter-form').on('submit', function(event) {
        event.preventDefault();

        const $form = $(this);
        var $email = $('#newsletter');
        var $successMessage = $('#newsletter-success');
        var $errorMessage = $('#newsletter-error');

        function validateEmail(email) {
            var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        function showSuccess() {
            $successMessage.removeClass('hidden');
            $form[0].reset();
            setTimeout(function() { $successMessage.addClass('hidden'); }, 3000);
        }

        function showError() {
            $errorMessage.removeClass('hidden');
            setTimeout(function() { $errorMessage.addClass('hidden'); }, 3000);
        }

        if (!validateEmail($email.val().trim())) {
            showError();
            return;
        }

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json'
        }).done(function(response) {
            if (response && response.status === 'success') {
                showSuccess();
            } else {
                showError();
            }
        }).fail(function() {
            showError();
        });
    });
}

function initSubmitContact() {
    const $form = $('#contact-form');
    const $success = $('#success-message');
    const $error = $('#error-message');

    if (!$form.length) return;

    function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    function showSuccess() {
        $success.removeClass('hidden');
        $form[0].reset();
        $('.selected-text').text("Project Type");
        setTimeout(() => { $success.addClass('hidden'); }, 3000);
    }

    function showError() {
        $error.removeClass('hidden');
        setTimeout(() => { $error.addClass('hidden'); }, 3000);
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const projectType = $('#project-type').val().trim();
        const message = $('#Message').val().trim();

        let isValid = true;

        if (name === "" || email === "" || subject === "" || message === "") {
            isValid = false;
        }
        if (!validateEmail(email)) {
            isValid = false;
        }
        if (projectType === "") {
            isValid = false;
        }

        if (!isValid) {
            showError();
            return;
        }

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json'
        }).done(function(response) {
            if (response && response.status === 'success') {
                showSuccess();
            } else {
                showError();
            }
        }).fail(function() {
            showError();
        });
    });
}
