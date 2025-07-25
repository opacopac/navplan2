<?php declare(strict_types=1);

namespace NavplanTest\System\Db\Mock;

use Navplan\System\Db\Domain\Model\IDbStatement;


class MockDbStatement implements IDbStatement
{
    public string $bindParamTypes = 'sids';
    public array $bindParamVars = [];
    public bool $hasBeenExecuted = false;
    public string $execErrorMessage = '';
    public int $insertId = 12345;


    public function bind_param(string $types, &...$vars): bool
    {
        $this->bindParamTypes = $types;
        $this->bindParamVars = $vars;

        return true;
    }


    public function execute(string $errorMessage): bool
    {
        $this->hasBeenExecuted = true;
        $this->execErrorMessage = $errorMessage;

        return true;
    }


    public function getInsertId(): int
    {
        return $this->insertId;
    }
}
