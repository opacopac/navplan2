<?php declare(strict_types=1);

namespace NavplanTest\User;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\User\Domain\Model\TokenCredentials;
use Navplan\User\Domain\Service\ITokenConfig;
use Navplan\User\Domain\Service\IUserService;
use Navplan\User\ProdUserDiContainer;
use Navplan\User\Rest\Service\UserController;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdUserDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdUserDiContainerTest extends TestCase
{
    private function createContainer(): ProdUserDiContainer
    {
        $tokenConfig = $this->createStub(ITokenConfig::class);
        $tokenConfig->method('getTokenCredentials')->willReturn(
            new TokenCredentials('secret', 'issuer')
        );

        return new ProdUserDiContainer(
            new MockHttpService(),
            $this->createStub(IDbService::class),
            $this->createStub(IMailService::class),
            $tokenConfig,
            new MockLoggingService()
        );
    }


    public function testResolvesUserService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IUserService::class, $container->getUserService());
    }


    public function testResolvesUserController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(UserController::class, $container->getUserController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getUserService(), $container->getUserService());
        $this->assertSame($container->getUserController(), $container->getUserController());
        $this->assertSame($container->getTokenService(), $container->getTokenService());
        $this->assertSame($container->getUserRepo(), $container->getUserRepo());
    }
}
