<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\System\DomainService\IDbService;
use Navplan\User\DomainModel\User;
use Navplan\User\DomainService\IUserRepo;


class DbUserRepo implements IUserRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function checkEmailExists(string $email): bool {
        $email = $this->dbService->escapeString($email);
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $this->dbService->execSingleResultQuery($query, TRUE, "error checking email");

        return $result->getNumRows() === 1;
    }


    public function createUser(string $email, string $password) {
        $email = $this->dbService->escapeString($email);
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
        $pw_hash = $this->dbService->escapeString($pw_hash);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        $this->dbService->execCUDQuery($query, "error creating user");
    }


    public function readUser(string $email): ?User {
        $email = $this->dbService->escapeString($email);
        $query = "SELECT * FROM users WHERE email = '" . $email . "'";
        $result = $this->dbService->execSingleResultQuery($query, TRUE, "error reading user");

        if ($result->getNumRows() !== 1) {
            return NULL;
        } else {
            $row = $result->fetch_assoc();
            return UserConverter::fromDbRow($row);
        }
    }


    public function updatePassword(string $email, string $newPassword) {
        $newpw_hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $newpw_hash = $this->dbService->escapeString($newpw_hash);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        $this->dbService->execCUDQuery($query, "error updating password");
    }


    public function verifyPwHash(string $email, string $password): bool {
        $email = $this->dbService->escapeString($email);
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = $this->dbService->execSingleResultQuery($query, TRUE, "error verifying pw hash");

        if ($result->getNumRows() == 1) {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            return $pw_hash_db === crypt($password, $pw_hash_db);
        }

        return FALSE;
    }
}
