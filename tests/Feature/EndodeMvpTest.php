<?php

namespace Tests\Feature;

use App\Services\MpesaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EndodeMvpTest extends TestCase
{
    use RefreshDatabase;

    public function test_endode_config_is_loaded(): void
    {
        $this->assertSame('Endode', config('endode.product.title'));
        $this->assertContains('en', config('endode.locales.supported'));
        $this->assertTrue(config('endode.features.mpesa_escrow'));
        $this->assertGreaterThan(10, count(config('endode.mvp_core_features')));
    }

    public function test_mpesa_service_mock_mode_simulates_stk_without_http(): void
    {
        config(['endode.payments.mode' => 'mock']);

        $mpesa = app(MpesaService::class);
        $this->assertTrue($mpesa->isMockMode());

        $result = $mpesa->initiateStkPush('254712345678', 100.0, 'REF-1', 'Test');
        $this->assertTrue($result['success']);
        $this->assertStringStartsWith('MOCK-', $result['checkout_request_id']);

        $status = $mpesa->checkTransactionStatus($result['checkout_request_id']);
        $this->assertSame(0, $status['ResultCode'] ?? null);
    }

    public function test_welcome_page_loads_with_endode_shared_props(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Landing/Welcome')
            ->has('endode.product')
            ->has('endode.mvp_features')
            ->where('endode.payments_mode', 'mock'));
    }
}
