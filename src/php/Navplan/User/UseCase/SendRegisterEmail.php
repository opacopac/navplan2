<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\NavplanHelper;
use Navplan\User\Domain\SendRegisterEmailRequest;
use Navplan\User\Domain\UserResponse;


class SendRegisterEmail {
    private $userRepo;
    private $httpService;
    private $mailService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->httpService = $config->getHttpService();
        $this->mailService = $config->getMailService();
    }


    public function sendRegisterEmail(SendRegisterEmailRequest $request): UserResponse {
        if (!UserHelper::checkEmailFormat($request->email)) {
            return new UserResponse(-1, 'error: invalid email format');
        }

        if ($this->userRepo->checkEmailExists($request->email)) {
            return new UserResponse(-2, 'error: email already exists');
        }

        // send activation email
        $token = UserHelper::createToken($request->email, false);
        $this->sendActivationEmail($request->email, $token);

        return new UserResponse(0, NULL, $request->email, '');
    }


    private function sendActivationEmail(string $email, string $token): bool {
        $activateUrl = NavplanHelper::NAVPLAN_BASE_URL . '/register/' . $token; // TODO -> config
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
