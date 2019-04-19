<?php declare(strict_types=1);

namespace NavplanTest\Shared;

require_once __DIR__ . "/../../config.php";

use Navplan\User\UserHelper;
use Navplan\User\UserUpdatePw;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class UserUpdatePwTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
    }


    public function test_updatePassword_returns_a_success_response() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $pw_hash = crypt($oldPassword);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        UserUpdatePw::updatePassword($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":0/');
        $this->expectOutputRegex('/(.*)"email":' . $email . '/');
        $this->expectOutputRegex('/(.*)"token":".{10,}"/');
    }


    public function test_updatePassword_updates_the_password() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $pw_hash = crypt($oldPassword);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        UserUpdatePw::updatePassword($this->getDbService(), $args);

        $this->assertContains("UPDATE users SET pw_hash", $this->getDbService()->lastQuery);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    public function test_updatePassword_invalid_new_password_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654";
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_updatePassword_invalid_token_returns_code_m2() {
        $token = "";
        $oldPassword = "123456";
        $newPassword = "654321";
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    public function test_updatePassword_invalid_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123";
        $newPassword = "654321";
        $this->getDbService()->pushMockResult([array("id" => 123456)]);
        $args = array("token" => $token, "oldpassword" => $oldPassword, "newpassword" => $newPassword);
        UserUpdatePw::updatePassword($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-3/');
    }
}
