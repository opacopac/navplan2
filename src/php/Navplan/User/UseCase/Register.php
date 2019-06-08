<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\Domain\RegisterRequest;
use Navplan\User\Domain\UserResponse;


class Register {
    private $userRepo;
    private $httpService;


    public function __construct(IUserConfig $config) {
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
        $this->httpService = $config->getHttpService();
    }


    public function register(RegisterRequest $request): UserResponse {
        if (!UserHelper::checkPwFormat($request->password)) {
            return new UserResponse(-1, 'error: invalid password format');
        }

        $email = UserHelper::getEmailFromToken($request->token);
        if (!$email || !UserHelper::checkEmailFormat($email)) {
            return new UserResponse(-2, 'error: invalid token');
        }

        if ($this->userRepo->checkEmailExists($email)) {
            return new UserResponse(-3, 'error: email already exists');
        }

        // create new user & token
        $this->userRepo->createUser($email, $request->password);
        $token = UserHelper::createToken($email, $request->rememberMe);

        return new UserResponse(0, NULL, $email, $token);
    }
}
