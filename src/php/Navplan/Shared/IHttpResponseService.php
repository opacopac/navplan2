<?php declare(strict_types=1);

namespace Navplan\Shared;


interface IHttpResponseService {
    public function header(string $header);

    public function payload(string $data);
}
