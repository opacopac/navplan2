<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendLostPw;

use Navplan\System\Domain\Service\IMailService;
use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class SendLostPwUc implements ISendLostPwUc {
    const NAVPLAN_BASE_URL = "https://www.navplan.ch/v2/#";


    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService,
        private IMailService $mailService
    ) {
    }


    public function sendLostPw(SendLostPwRequest $request): UserResponse {
        if (!$request->email || $request->email === '') {
            return new UserResponse(-1, 'error: email missing');
        }

        if (!User::checkEmailFormat($request->email)) {
            return new UserResponse(-1, 'error: invalid email format');
        }

        if (!$this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-2, 'error: email does not exist');
        }

        // send pw recovery email
        $token = $this->tokenService->createToken($request->email, false);
        $this->sendPwRecoveryEmail($request->email, $token);

        return new UserResponse(0, NULL, $request->email, '');
    }


    private function sendPwRecoveryEmail(string $email, string $token): bool {
        // TODO
        $resetPwUrl = self::NAVPLAN_BASE_URL . '/resetpw/' . $token;
        $subject = "Navplan.ch - Reset Password";
        $message = '
            <html>
            <head>
              <title>Navplan.ch - Reset Password</title>
            </head>
            <body>
              <p>Please click the following link to reset your password on Navplan.ch:</p>
              <p><a href="' . $resetPwUrl . '">Reset Password</a></p>
            </body>
            </html>';

        return $this->mailService->sendEmail($email, $subject, $message);
    }
}
