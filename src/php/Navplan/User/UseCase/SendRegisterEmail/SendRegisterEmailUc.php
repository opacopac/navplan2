<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendRegisterEmail;

use Navplan\System\Domain\Service\IMailService;
use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\UseCase\UserResponse;


class SendRegisterEmailUc implements ISendRegisterEmailUc {
    const NAVPLAN_BASE_URL = "https://www.navplan.ch/v2/#";


    public function __construct(
        private IUserRepo $userRepo,
        private ITokenService $tokenService,
        private IMailService $mailService
    ) {
    }


    public function sendRegisterEmail(SendRegisterEmailRequest $request): UserResponse {
        if (!User::checkEmailFormat($request->email)) {
            return new UserResponse(-1, 'error: invalid email format');
        }

        if ($this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-2, 'error: email already exists');
        }

        // send activation email
        $token = $this->tokenService->createToken($request->email, false);
        $this->sendActivationEmail($request->email, $token);

        return new UserResponse(0, NULL, $request->email, '');
    }


    private function sendActivationEmail(string $email, string $token): bool {
        $activateUrl = self::NAVPLAN_BASE_URL . '/register/' . $token; // TODO -> config
        $subject = "Welcome to Navplan.ch";
        $message = '
            <html>
            <head>
              <title>Welcome to Navplan.ch</title>
            </head>
            <body>
              <p>Welcome to Navplan.ch!</p>
              <p>Please click the following link to confirm your email address and create your account on Navplan.ch:</p>
              <p><a href="' . $activateUrl . '">Create Account</a></p>
            </body>
            </html>';

        return $this->mailService->sendEmail($email, $subject, $message);
    }
}
