<?php

namespace App\Exceptions\Auth;

use Exception;

class AuthException extends Exception
{
      
    public function render($request)
    {
        return response()->json([
            'success' => false,
            'message' => $this->getMessage()
        ], $this->getCode());
    }
}
