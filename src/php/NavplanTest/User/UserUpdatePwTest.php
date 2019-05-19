<?php declare(strict_types=1);

namespace NavplanTest\Shared;

require_once __DIR__ . "/../../config.php";

use Navplan\User\UserHelper;
use Navplan\User\UserUpdatePw;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class UserUpdatePwTest extends TestCase {
    private $dbService;
    private $httpService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->httpService = new HttpResponseServiceMock();
    }


    public function test_updatePassword_returns_a_success_response() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $pw_hash = password_hash($oldPassword, PASSWORD_BCRYPT);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        UserUpdatePw::updatePassword($args, $this->getDbService(), $this->getHttpService());

        $this->assertRegExp('/(.*)"resultcode":0/', $this->getHttpService()->body);
        $this->assertRegExp('/(.*)"email":"' . $email . '"/', $this->getHttpService()->body);
        $this->assertRegExp('/(.*)"token":".{10,}"/', $this->getHttpService()->body);
    }


    public function test_updatePassword_updates_the_password() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $pw_hash = password_hash($oldPassword, PASSWORD_BCRYPT);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        UserUpdatePw::updatePassword($args, $this->getDbService(), $this->getHttpService());

        $this->assertStringContainsString("UPDATE users SET pw_hash", $this->getDbService()->lastQuery);
        $this->assertRegExp('/(.*)"resultcode":0/', $this->getHttpService()->body);
    }


    public function test_updatePassword_invalid_new_password_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654";
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($args, $this->getDbService(), $this->getHttpService());

        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    public function test_updatePassword_invalid_token_returns_code_m2() {
        $token = "";
        $oldPassword = "123456";
        $newPassword = "654321";
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($args, $this->getDbService(), $this->getHttpService());

        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }


    public function test_updatePassword_invalid_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123";
        $newPassword = "654321";
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($args, $this->getDbService(), $this->getHttpService());

        $this->assertRegExp('/(.*)"resultcode":-3/', $this->getHttpService()->body);
    }
}
