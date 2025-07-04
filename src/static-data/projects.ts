// src/static-data/projects.ts
import { ProjectCard } from '@/types';

export const staticProjects: ProjectCard[] = [
  {
    id: 1,
    titulo: "Sistema de Gestão Empresarial com React + TypeScript",
    descricao: "Plataforma completa de gestão empresarial desenvolvida com React 18, TypeScript, e arquitetura modular. Inclui módulos de vendas, estoque, financeiro e RH com dashboard interativo e relatórios em tempo real.",
    imageurl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    data_criacao: "2024-01-15T10:00:00Z",
    data_modificacao: "2025-01-02T14:30:00Z",
    categoria: "React + TypeScript",
    conteudo: `# Sistema de Gestão Empresarial

## Visão Geral
Este projeto representa uma solução completa de gestão empresarial desenvolvida com as mais modernas tecnologias web. A aplicação foi construída com foco em performance, escalabilidade e experiência do usuário.

## Tecnologias Utilizadas
- **Frontend**: React 18 com TypeScript
- **State Management**: Zustand + React Query
- **UI Components**: Tailwind CSS + Radix UI
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## Arquitetura do Projeto
\`\`\`typescript
// Exemplo de componente principal
interface DashboardProps {
  user: User;
  metrics: MetricData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, metrics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');
  
  const filteredMetrics = useMemo(() => 
    metrics.filter(m => m.period === selectedPeriod),
    [metrics, selectedPeriod]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredMetrics.map(metric => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </div>
  );
};
\`\`\`

## Funcionalidades Principais

### 1. Dashboard Interativo
- Visualização de métricas em tempo real
- Gráficos dinâmicos com Recharts
- Filtros e exportação de dados

### 2. Módulo de Vendas
- Gestão de pedidos e clientes
- Integração com sistemas de pagamento
- Relatórios de performance

### 3. Controle de Estoque
- Inventário em tempo real
- Alertas de estoque baixo
- Histórico de movimentações

## Resultados Alcançados
- **Performance**: 98/100 no Lighthouse
- **Redução de Custos**: 35% em operações manuais
- **Satisfação**: 4.8/5 na avaliação dos usuários

## Aprendizados
Este projeto me ensinou a importância de uma arquitetura bem planejada e do uso correto de TypeScript para prevenir bugs em produção.

:::Destaque especial para o sistema de cache implementado que reduziu em 60% as requisições ao servidor:::

## Código Exemplo - Hook Customizado
\`\`\`typescript
export const useMetrics = (period: Period) => {
  return useQuery({
    queryKey: ['metrics', period],
    queryFn: () => fetchMetrics(period),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,
  });
};
\`\`\`

## Links e Recursos
- @@Demo Online@@ - Acesse a demonstração completa
- @@Código Fonte@@ - Repositório no GitHub
- @@Documentação@@ - Guia completo de uso

---

*Projeto desenvolvido com paixão e dedicação para transformar a gestão empresarial.*`
  },
  {
    id: 2,
    titulo: "API RESTful com Python + FastAPI",
    descricao: "API de alta performance construída com FastAPI, PostgreSQL e Redis. Implementa autenticação JWT, rate limiting, cache distribuído e documentação automática com OpenAPI.",
    imageurl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    data_criacao: "2024-03-20T08:00:00Z",
    data_modificacao: "2024-12-28T16:45:00Z",
    categoria: "Python + FastAPI",
    conteudo: `# API RESTful de Alta Performance

## Introdução
Esta API foi desenvolvida para suportar milhões de requisições diárias com latência mínima, utilizando as melhores práticas de desenvolvimento em Python.

## Stack Tecnológica
- **Framework**: FastAPI (Python 3.11)
- **Banco de Dados**: PostgreSQL com SQLAlchemy
- **Cache**: Redis
- **Autenticação**: JWT com refresh tokens
- **Deploy**: Docker + Kubernetes

## Arquitetura

### Estrutura do Projeto
\`\`\`python
# main.py - Configuração principal
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

app = FastAPI(
    title="High Performance API",
    version="2.0.0",
    docs_url="/api/docs"
)

# Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting decorator
@rate_limit(max_calls=100, time_window=60)
@app.get("/api/v1/users/{user_id}")
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = await UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

## Funcionalidades Implementadas

### 1. Sistema de Autenticação
\`\`\`python
# authentication.py
async def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(
        to_encode, 
        SECRET_KEY, 
        algorithm=ALGORITHM
    )
    return encoded_jwt

# Implementação de refresh token
async def refresh_access_token(refresh_token: str):
    try:
        payload = jwt.decode(
            refresh_token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
            
        # Gerar novo access token
        access_token = await create_access_token(
            data={"sub": user_id}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except JWTError:
        raise credentials_exception
\`\`\`

### 2. Cache Distribuído com Redis
\`\`\`python
# cache.py
import redis.asyncio as redis
import json

class CacheService:
    def __init__(self):
        self.redis = redis.from_url(
            "redis://localhost:6379",
            decode_responses=True
        )
    
    async def get(self, key: str):
        value = await self.redis.get(key)
        return json.loads(value) if value else None
    
    async def set(self, key: str, value: dict, expire: int = 3600):
        await self.redis.setex(
            key, 
            expire, 
            json.dumps(value)
        )
    
    async def invalidate(self, pattern: str):
        keys = await self.redis.keys(pattern)
        if keys:
            await self.redis.delete(*keys)

# Uso no endpoint
@app.get("/api/v1/products")
async def get_products(
    skip: int = 0,
    limit: int = 100,
    cache: CacheService = Depends(get_cache)
):
    cache_key = f"products:{skip}:{limit}"
    
    # Verificar cache
    cached_data = await cache.get(cache_key)
    if cached_data:
        return cached_data
    
    # Buscar do banco
    products = await ProductService.get_all(skip, limit)
    
    # Salvar no cache
    await cache.set(cache_key, products, expire=300)
    
    return products
\`\`\`

### 3. Rate Limiting Avançado
\`\`\`python
# rate_limiter.py
from functools import wraps
import time

class RateLimiter:
    def __init__(self, redis_client):
        self.redis = redis_client
    
    def limit(self, max_calls: int, time_window: int):
        def decorator(func):
            @wraps(func)
            async def wrapper(request: Request, *args, **kwargs):
                # Identificar cliente
                client_id = f"{request.client.host}:{request.url.path}"
                
                # Verificar limite
                current = await self.redis.incr(client_id)
                if current == 1:
                    await self.redis.expire(client_id, time_window)
                
                if current > max_calls:
                    raise HTTPException(
                        status_code=429,
                        detail="Rate limit exceeded"
                    )
                
                return await func(request, *args, **kwargs)
            return wrapper
        return decorator
\`\`\`

## Performance e Otimizações

### Métricas Alcançadas
- **Latência**: P99 < 50ms
- **Throughput**: 10.000 req/s
- **Uptime**: 99.99%

### Otimizações Implementadas
1. **Connection Pooling**: Pool de conexões para PostgreSQL
2. **Async/Await**: Operações assíncronas em todos os endpoints
3. **Paginação Eficiente**: Cursor-based pagination
4. **Compressão**: Gzip para respostas grandes

## Testes e Qualidade

\`\`\`python
# test_users.py
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/users",
            json={
                "email": "test@example.com",
                "password": "strongpassword123"
            }
        )
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"

# Test com mock do cache
@pytest.mark.asyncio
async def test_get_products_with_cache(mock_cache):
    mock_cache.get.return_value = None
    mock_cache.set.return_value = None
    
    response = await client.get("/api/v1/products")
    
    assert response.status_code == 200
    mock_cache.get.assert_called_once()
    mock_cache.set.assert_called_once()
\`\`\`

## Documentação Automática
A API gera automaticamente documentação interativa disponível em:
- @@/api/docs@@ - Swagger UI
- @@/api/redoc@@ - ReDoc

## Monitoramento e Observabilidade
- **Logs**: Estruturados em JSON com correlation IDs
- **Métricas**: Prometheus + Grafana
- **Tracing**: OpenTelemetry com Jaeger

## Conclusão
Esta API demonstra como construir sistemas de alta performance com Python, mantendo o código limpo e manutenível.

---

:::Performance é fundamental, mas nunca deve comprometer a segurança ou a manutenibilidade do código:::

## Links Úteis
- @@Repositório GitHub@@ - Código fonte completo
- @@Documentação API@@ - Guia completo de endpoints
- @@Métricas em Tempo Real@@ - Dashboard de performance`
  },
  {
    id: 3,
    titulo: "E-commerce Mobile com Flutter",
    descricao: "Aplicativo de e-commerce multiplataforma desenvolvido com Flutter, integração com Firebase, pagamentos via Stripe e entrega em tempo real. Suporta iOS e Android com performance nativa.",
    imageurl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    data_criacao: "2024-06-10T12:00:00Z",
    data_modificacao: "2024-12-15T09:20:00Z",
    categoria: "Flutter",
    conteudo: `# E-commerce Mobile Multiplataforma

## Sobre o Projeto
Aplicativo de e-commerce completo desenvolvido com Flutter, oferecendo uma experiência de compra fluida e intuitiva em iOS e Android com uma única base de código.

## Tecnologias e Ferramentas
- **Framework**: Flutter 3.16 com Dart
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Pagamentos**: Stripe SDK
- **State Management**: Riverpod 2.0
- **Arquitetura**: Clean Architecture + MVVM

## Arquitetura da Aplicação

### Estrutura de Pastas
\`\`\`dart
lib/
├── core/
│   ├── theme/
│   ├── utils/
│   └── constants/
├── data/
│   ├── models/
│   ├── repositories/
│   └── services/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── presentation/
│   ├── providers/
│   ├── screens/
│   └── widgets/
└── main.dart
\`\`\`

## Implementações Principais

### 1. Sistema de Autenticação
\`\`\`dart
// auth_provider.dart
class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _authRepository;
  
  AuthNotifier(this._authRepository) : super(AuthState.initial());
  
  Future<void> signInWithEmail(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final user = await _authRepository.signInWithEmail(
        email: email,
        password: password,
      );
      
      state = state.copyWith(
        isLoading: false,
        user: user,
        isAuthenticated: true,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  // Autenticação biométrica
  Future<void> signInWithBiometrics() async {
    final localAuth = LocalAuthentication();
    
    final isAvailable = await localAuth.canCheckBiometrics;
    if (!isAvailable) {
      throw Exception('Biometria não disponível');
    }
    
    final didAuthenticate = await localAuth.authenticate(
      localizedReason: 'Entre com sua biometria',
      options: const AuthenticationOptions(
        biometricOnly: true,
      ),
    );
    
    if (didAuthenticate) {
      // Recuperar token salvo e autenticar
      final token = await _secureStorage.read(key: 'auth_token');
      await _authRepository.signInWithToken(token);
    }
  }
}
\`\`\`

### 2. Catálogo de Produtos com Busca
\`\`\`dart
// product_screen.dart
class ProductCatalogScreen extends ConsumerStatefulWidget {
  @override
  _ProductCatalogScreenState createState() => _ProductCatalogScreenState();
}

class _ProductCatalogScreenState extends ConsumerState<ProductCatalogScreen> {
  final _searchController = TextEditingController();
  final _scrollController = ScrollController();
  
  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }
  
  void _onScroll() {
    if (_scrollController.position.pixels >= 
        _scrollController.position.maxScrollExtent * 0.8) {
      // Carregar mais produtos (pagination)
      ref.read(productProvider.notifier).loadMore();
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final products = ref.watch(productProvider);
    
    return Scaffold(
      body: CustomScrollView(
        controller: _scrollController,
        slivers: [
          SliverAppBar(
            floating: true,
            pinned: true,
            expandedHeight: 120,
            flexibleSpace: FlexibleSpaceBar(
              title: Text('Catálogo'),
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Theme.of(context).primaryColor,
                      Theme.of(context).primaryColor.withOpacity(0.7),
                    ],
                  ),
                ),
              ),
            ),
          ),
          
          SliverPersistentHeader(
            pinned: true,
            delegate: SearchBarDelegate(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Buscar produtos...',
                    prefixIcon: Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    filled: true,
                    fillColor: Colors.grey[100],
                  ),
                  onChanged: (value) {
                    ref.read(productProvider.notifier).search(value);
                  },
                ),
              ),
            ),
          ),
          
          products.when(
            loading: () => SliverFillRemaining(
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (error, stack) => SliverFillRemaining(
              child: ErrorWidget(error: error.toString()),
            ),
            data: (productList) => SliverGrid(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.7,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) => ProductCard(
                  product: productList[index],
                  onTap: () => _navigateToProduct(productList[index]),
                ),
                childCount: productList.length,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
\`\`\`

### 3. Carrinho de Compras com Animações
\`\`\`dart
// cart_screen.dart
class CartScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartItems = ref.watch(cartProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Carrinho'),
        actions: [
          Badge(
            label: Text(cartItems.length.toString()),
            child: Icon(Icons.shopping_cart),
          ),
        ],
      ),
      body: cartItems.isEmpty
          ? _buildEmptyCart()
          : AnimatedList(
              initialItemCount: cartItems.length,
              itemBuilder: (context, index, animation) {
                final item = cartItems[index];
                
                return SlideTransition(
                  position: animation.drive(
                    Tween(begin: Offset(1, 0), end: Offset.zero).chain(
                      CurveTween(curve: Curves.easeOut),
                    ),
                  ),
                  child: Dismissible(
                    key: Key(item.id),
                    direction: DismissDirection.endToStart,
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      padding: EdgeInsets.only(right: 20),
                      child: Icon(Icons.delete, color: Colors.white),
                    ),
                    onDismissed: (_) {
                      ref.read(cartProvider.notifier).removeItem(item.id);
                    },
                    child: CartItemTile(item: item),
                  ),
                );
              },
            ),
      bottomNavigationBar: CartSummary(
        total: _calculateTotal(cartItems),
        onCheckout: () => _proceedToCheckout(context, ref),
      ),
    );
  }
}
\`\`\`

### 4. Integração com Pagamentos
\`\`\`dart
// payment_service.dart
class PaymentService {
  final Stripe stripe;
  
  PaymentService() : stripe = Stripe.instance;
  
  Future<PaymentResult> processPayment({
    required double amount,
    required String currency,
    required PaymentMethod method,
  }) async {
    try {
      // 1. Criar Payment Intent no backend
      final paymentIntent = await _createPaymentIntent(
        amount: amount,
        currency: currency,
      );
      
      // 2. Confirmar pagamento no cliente
      final paymentMethod = await stripe.createPaymentMethod(
        params: PaymentMethodParams.card(
          paymentMethodData: PaymentMethodData(
            billingDetails: BillingDetails(
              email: currentUser.email,
              name: currentUser.name,
            ),
          ),
        ),
      );
      
      // 3. Confirmar o pagamento
      final result = await stripe.confirmPayment(
        paymentIntentClientSecret: paymentIntent.clientSecret,
        data: PaymentMethodParams.card(
          paymentMethodData: PaymentMethodData(),
        ),
      );
      
      if (result.status == PaymentIntentsStatus.succeeded) {
        return PaymentResult.success(
          transactionId: result.id,
        );
      } else {
        return PaymentResult.failure(
          error: 'Pagamento falhou',
        );
      }
    } catch (e) {
      return PaymentResult.failure(
        error: e.toString(),
      );
    }
  }
}
\`\`\`

### 5. Rastreamento de Pedidos em Tempo Real
\`\`\`dart
// order_tracking_screen.dart
class OrderTrackingScreen extends ConsumerWidget {
  final String orderId;
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final orderStream = ref.watch(orderTrackingProvider(orderId));
    
    return Scaffold(
      body: orderStream.when(
        loading: () => LoadingIndicator(),
        error: (error, stack) => ErrorView(error: error),
        data: (order) => Stack(
          children: [
            // Mapa com localização em tempo real
            GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(order.currentLat, order.currentLng),
                zoom: 15,
              ),
              markers: {
                Marker(
                  markerId: MarkerId('delivery'),
                  position: LatLng(order.currentLat, order.currentLng),
                  icon: BitmapDescriptor.fromAsset('assets/delivery_icon.png'),
                ),
                Marker(
                  markerId: MarkerId('destination'),
                  position: LatLng(order.destLat, order.destLng),
                  icon: BitmapDescriptor.defaultMarkerWithHue(
                    BitmapDescriptor.hueGreen,
                  ),
                ),
              },
              polylines: {
                Polyline(
                  polylineId: PolylineId('route'),
                  points: order.routePoints
                      .map((p) => LatLng(p.lat, p.lng))
                      .toList(),
                  color: Theme.of(context).primaryColor,
                  width: 5,
                ),
              },
            ),
            
            // Card com informações do pedido
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: OrderInfoCard(
                order: order,
                estimatedTime: order.estimatedDeliveryTime,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
\`\`\`

## Performance e Otimizações

### Métricas de Performance
- **Startup Time**: < 2s (cold start)
- **Frame Rate**: 60 FPS constante
- **Bundle Size**: 15MB (Android), 25MB (iOS)
- **Crash Rate**: < 0.1%

### Otimizações Implementadas
1. **Lazy Loading**: Carregamento sob demanda de imagens
2. **Code Splitting**: Rotas carregadas dinamicamente
3. **Image Caching**: Cache inteligente de imagens
4. **State Persistence**: Persistência offline com Hive

## Funcionalidades Offline
\`\`\`dart
// offline_sync_service.dart
class OfflineSyncService {
  final HiveInterface hive;
  final ConnectivityResult connectivity;
  
  Future<void> syncData() async {
    final hasConnection = await _checkConnectivity();
    
    if (hasConnection) {
      // Sincronizar dados pendentes
      final pendingOrders = await hive.box('pending_orders').values;
      
      for (final order in pendingOrders) {
        try {
          await _uploadOrder(order);
          await hive.box('pending_orders').delete(order.id);
        } catch (e) {
          // Manter na fila para próxima tentativa
          print('Falha ao sincronizar pedido {order.id}');
        }
      }
    }
  }
}
\`\`\`

## Testes Automatizados
- **Unit Tests**: 85% de cobertura
- **Widget Tests**: Todos os componentes críticos
- **Integration Tests**: Fluxos principais E2E

## Resultados e Impacto
- **Downloads**: 50.000+ em 3 meses
- **Rating**: 4.7★ (iOS), 4.6★ (Android)
- **Conversão**: Aumento de 40% nas vendas mobile
- **Retenção**: 65% de usuários ativos mensais

## Conclusão
Este projeto demonstra o poder do Flutter para criar aplicações mobile de alta qualidade com uma única base de código, mantendo performance nativa e excelente experiência do usuário.

---

:::A melhor tecnologia é aquela que o usuário nem percebe que está usando:::

## Links e Demonstração
- @@App Store@@ - Download para iOS
- @@Google Play@@ - Download para Android
- @@Vídeo Demo@@ - Tour completo pelo app`
  }
];

// Função auxiliar para buscar projeto por ID
export const getProjectById = (id: number): ProjectCard | undefined => {
  return staticProjects.find(p => p.id === id);
};

// Função auxiliar para buscar projetos por categoria
export const getProjectsByCategory = (category: string): ProjectCard[] => {
  if (!category) return staticProjects;
  return staticProjects.filter(p => 
    p.categoria.toLowerCase() === category.toLowerCase()
  );
};

// Função auxiliar para buscar projetos
export const searchProjects = (query: string): ProjectCard[] => {
  const lowerQuery = query.toLowerCase();
  return staticProjects.filter(p => 
    p.titulo.toLowerCase().includes(lowerQuery) ||
    p.descricao.toLowerCase().includes(lowerQuery) ||
    p.categoria.toLowerCase().includes(lowerQuery)
  );
};
