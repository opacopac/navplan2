<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface IHttpService {
    public function header(string $header);

    public function payload(string $data);
}
