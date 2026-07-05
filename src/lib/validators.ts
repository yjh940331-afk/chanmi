export const fanPostLimits = {
  nicknameMin: 2,
  nicknameMax: 16,
  messageMin: 5,
  messageMax: 360,
};

export function validateFanPostInput(nickname: string, message: string) {
  const errors: Record<string, string> = {};
  const trimmedNickname = nickname.trim();
  const trimmedMessage = message.trim();

  if (trimmedNickname.length < fanPostLimits.nicknameMin) {
    errors.nickname = '닉네임은 2자 이상 입력해주세요.';
  }

  if (trimmedNickname.length > fanPostLimits.nicknameMax) {
    errors.nickname = '닉네임은 16자 이하로 입력해주세요.';
  }

  if (trimmedMessage.length < fanPostLimits.messageMin) {
    errors.message = '응원 메시지는 5자 이상 입력해주세요.';
  }

  if (trimmedMessage.length > fanPostLimits.messageMax) {
    errors.message = '응원 메시지는 360자 이하로 입력해주세요.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

