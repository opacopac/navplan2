<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\NavplanHelper;
use Navplan\User\Domain\SendLostPwRequest;
use Navplan\User\Domain\UserResponse;


class SendLostPw {
    private $userRepo;
    private $httpService;
    private $mailService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->httpService = $config->getHttpResponseService();
        $this->mailService = $config->getMailService();
    }


    public function sendLostPw(SendLostPwRequest $request): UserResponse {
        if (!$request->email || $request->email === '') {
            return new UserResponse(-1, 'error: email missing');
        }

        if (!UserHelper::checkEmailFormat($request->email)) {
            return new UserResponse(-1, 'error: invalid email format');
        }

        if (!$this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-2, 'error: email does not exist');
        }

        // send pw recovery email
        $token = UserHelper::createToken($request->email, false);
        $this->sendPwRecoveryEmail($request->email, $token);

        return new UserResponse(0, NULL, $request->email, '');
    }


    private function sendPwRecoveryEmail(string $email, string $token): bool {
        // TODO
        $resetPwUrl = NavplanHelper::NAVPLAN_BASE_URL . '/resetpw/' . $token;
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
