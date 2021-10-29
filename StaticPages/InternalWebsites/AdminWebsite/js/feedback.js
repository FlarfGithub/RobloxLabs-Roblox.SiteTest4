var Roblox = Roblox || {};

Roblox.Feedback = (function () {
	var selectors = {
		feedbackError: '.feedback-error',
		feedbackErrorClose: '.feedback-error-close',
		feedbackSuccess: '.feedback-success',
		feedbackSuccessClose: '.feedback-success-close',
		feedbackMsg: '.feedback-msg',
	};

	function resetFeedback() {
		var feedbackError = $(selectors.feedbackError);
		var feedbackSuccess = $(selectors.feedbackSuccess);
		feedbackError.addClass('hide');
		feedbackSuccess.addClass('hide');
	}

	function showError(message) {
		resetFeedback();
		var feedbackError = $(selectors.feedbackError);
		feedbackError.removeClass('hide');
		feedbackError.find(selectors.feedbackMsg).text(message);
	}

	function showSuccess(message) {
		resetFeedback();
		var feedbackSuccess = $(selectors.feedbackSuccess);
		feedbackSuccess.removeClass('hide');
		feedbackSuccess.find(selectors.feedbackMsg).text(message);
	}

	$(function () {
		$(selectors.feedbackErrorClose).click(Roblox.Feedback.Reset);
		$(selectors.feedbackSuccessClose).click(Roblox.Feedback.Reset);
	});

	return {
		Reset: resetFeedback,
		Error: showError,
		Success: showSuccess,
	};
})();
