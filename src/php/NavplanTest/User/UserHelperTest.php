<?php declare(strict_types=1);

namespace NavplanTest\Shared;

require_once __DIR__ . "/../../config_test.php";

use InvalidArgumentException;
use Navplan\Message;
use Navplan\User\UserHelper;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class UserHelperTest extends TestCase {
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


    public function test_escapeTrimInput() {
        $input = " asdf's ";
        $result = UserHelper::escapeTrimInput($this->getDbService(), $input);

        $this->assertEquals("asdf\\'s", $result);
    }


    public function test_checkEmailFormat() {
        $email1 = "test@navplan.ch";
        $email2 = "test";
        $email3 = "test@01234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890";

        $this->assertTrue(UserHelper::checkEmailFormat($email1));
        $this->assertFalse(UserHelper::checkEmailFormat($email2));
        $this->assertFalse(UserHelper::checkEmailFormat($email3));
    }


    public function test_checkPwFormat() {
        $pw1 = "123456";
        $pw2 = "123";
        $pw3 = "012345678901234567890123456789012345678901234567890123456789";

        $this->assertTrue(UserHelper::checkPwFormat($pw1));
        $this->assertFalse(UserHelper::checkPwFormat($pw2));
        $this->assertFalse(UserHelper::checkPwFormat($pw3));
    }


    public function test_createToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = UserHelper::createToken($email, TRUE);
        $emailFromToken1 = UserHelper::getEmailFromToken($token1);
        $emailFromToken2 = UserHelper::getEmailFromToken($token2);

        $this->assertEquals($email, $emailFromToken1);
        $this->assertEquals($email, $emailFromToken2);
        // TODO: check validity duration
    }


    public function test_validateToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx" . $token1;
        $token3 = "";

        $this->assertTrue(UserHelper::validateToken($token1));
        $this->assertFalse(UserHelper::validateToken($token2));
        $this->assertFalse(UserHelper::validateToken($token3));
    }


    public function test_getEmailFromToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx.yyy.zzz";
        $token3 = "";

        $this->assertEquals($email, UserHelper::getEmailFromToken($token1));
        $this->assertEquals(NULL, UserHelper::getEmailFromToken($token2));
        $this->assertEquals(NULL, UserHelper::getEmailFromToken($token3));
    }


    public function test_escapeAuthenticatedEmailOrDie() {
        $email = "test@navplan's.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx.yyy.zzz";

        $result1 = UserHelper::escapeAuthenticatedEmailOrDie($this->getDbService(), $token1);
        $this->assertEquals($result1, "test@navplan\\'s.ch");

        $this->expectException(InvalidArgumentException::class);
        UserHelper::escapeAuthenticatedEmailOrDie($this->getDbService(), $token2);
    }


    public function test_escapeAuthenticatedEmailOrNull() {
        $email = "test@navplan's.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx.yyy.zzz";
        $result1 = UserHelper::escapeAuthenticatedEmailOrNull($this->getDbService(), $token1);
        $result2 = UserHelper::escapeAuthenticatedEmailOrNull($this->getDbService(), $token2);

        $this->assertEquals($result1, "test@navplan\\'s.ch");
        $this->assertEquals($result2, NULL);
    }


    public function test_checkEmailExists() {
        $email = "test@navplan.ch";

        $this->getDbService()->pushMockResult([array("id" => 12345)]);
        $result1 = UserHelper::checkEmailExists($this->getDbService(), $email);
        $this->assertTrue($result1);

        $this->getDbService()->pushMockResult([]);
        $result2 = UserHelper::checkEmailExists($this->getDbService(), $email);
        $this->assertFalse($result2);
    }


    public function test_verifyPwHash() {
        $email = "test@navplan.ch";
        $password = "123456";
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);

        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        $result1 = UserHelper::verifyPwHash($this->getDbService(), $email, $password);
        $this->assertTrue($result1);

        $this->getDbService()->pushMockResult([array("pw_hash" => "xxx")]);
        $result2 = UserHelper::verifyPwHash($this->getDbService(), $email, $password);
        $this->assertFalse($result2);

        $this->getDbService()->pushMockResult([]);
        $result3 = UserHelper::verifyPwHash($this->getDbService(), $email, $password);
        $this->assertFalse($result3);
    }


    public function test_sendSuccessResponse() {
        $email = "test@navplan.ch";
        $token = "xxx.yyy.zzz";
        UserHelper::sendSuccessResponse($this->getHttpService(), $email, $token);

        $this->assertRegExp('/(.*)"resultcode":0/', $this->getHttpService()->body);
        $this->assertRegExp('/(.*)"email":"' . $email . '"/', $this->getHttpService()->body);
        $this->assertRegExp('/(.*)"token":"' . $token . '"/', $this->getHttpService()->body);
    }


    public function test_sendErrorResponse() {
        UserHelper::sendErrorResponse($this->getHttpService(), new Message(-2, 'xxx'));

        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }
}
