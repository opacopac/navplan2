<?php declare(strict_types=1);

namespace Navplan\System;


interface IHttpResponseService {
    public function header(string $header);

    public function payload(string $data);
}
