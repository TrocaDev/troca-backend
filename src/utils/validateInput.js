function validateInput(argument) {
    // Regular expressions to match phone number and string with ".celo" at the end
    const phoneNumberRegex = /^\+\d{1,15}$/;
    const celoStringRegex = /^.+\.celo$/;

    if (phoneNumberRegex.test(argument)) {
        console.log("Valid phone number");
        return {
          _mobile: true,
          _valid: true,
        }
    } else if (celoStringRegex.test(argument)) {
        console.log('Valid string with ".celo" at the end');
        return {
          _mobile: false,
          _valid: true,
        }
    } else {
        console.log("Invalid input");
        return {
          _mobile: null,
          _valid: false,
        }
    }
}

module.exports = {
  validateInput
}