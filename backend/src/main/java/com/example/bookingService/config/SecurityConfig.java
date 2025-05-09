package com.example.bookingService.config;
import com.example.bookingService.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtFilter jwtFilter) throws Exception {
        http
                // 1) отключаем CSRF, т.к. у нас stateless API
                .csrf(csrf -> csrf.disable())

                // 2) НЕ используем http.cors() – CORS уже «по-прежнему» обрабатывается GlobalCorsConfig
                // .cors(Customizer.withDefaults()).and()

                // 3) правила доступа
                .authorizeHttpRequests(auth -> auth
                        // 3.1) preflight пропускаем
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 3.2) публично доступны только логин и регистрация
                        .requestMatchers("/auth/login", "/auth/register").permitAll()
                        // 3.3) всё остальное – только с валидным JWT
                        .anyRequest().authenticated()
                )

                // 4) stateless, без сессий
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 5) вставляем ваш JWT-фильтр
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
