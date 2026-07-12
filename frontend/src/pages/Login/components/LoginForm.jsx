import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginForm({
  form,
  setForm,
  error,
  loading,
  showPw,
  setShowPw,
  handleSubmit,
  submitButtonRef,
}) {
  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      {/* Email Field */}
      <div className="input-group">
        <label htmlFor="email-input" className="input-label">EMAIL ADDRESS</label>
        <div className="input-wrapper">
          <Mail size={16} className="input-icon" />
          <input
            id="email-input"
            type="email"
            className={`input-field ${error && !form.email ? 'has-error' : ''}`}
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            disabled={loading}
            aria-required="true"
            aria-label="Email Address"
            aria-invalid={!!error && !form.email}
            aria-describedby={error ? 'form-error-msg' : undefined}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="input-group">
        <label htmlFor="password-input" className="input-label">PASSWORD</label>
        <div className="input-wrapper">
          <Lock size={16} className="input-icon" />
          <input
            id="password-input"
            type={showPw ? 'text' : 'password'}
            className={`input-field ${error && !form.password ? 'has-error' : ''}`}
            placeholder="Enter your PASSWORD"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
            disabled={loading}
            aria-required="true"
            aria-label="PASSWORD"
            aria-invalid={!!error && !form.password}
            aria-describedby={error ? 'form-error-msg' : undefined}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            title={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Form Error Alert */}
      {error && (
        <div id="form-error-msg" className="error-alert" role="alert">
          <span className="error-text">{error}</span>
        </div>
      )}

      {/* Remember Me & Forgot Password Row */}
      <div className="remember-forgot-row">
        <div className="remember-me-group">
          <input
            id="remember-me-checkbox"
            type="checkbox"
            className="checkbox-input"
            checked={form.rememberMe}
            onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
            disabled={loading}
          />
          <label htmlFor="remember-me-checkbox" className="checkbox-label">
            Remember me
          </label>
        </div>

        <a
          href="#forgot-password"
          className="forgot-password-link"
          onClick={(e) => {
            e.preventDefault();
            alert('Password recovery is disabled. Please use the Demo Access credentials below.');
          }}
        >
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        ref={submitButtonRef}
        type="submit"
        className="submit-button"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <div className="loading-spinner-container">
            <div className="spinner" aria-hidden="true" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="submit-btn-content-centered">
            <span className="submit-text">Sign In</span>
            <span className="submit-arrow-circle">
              <ArrowRight size={14} className="submit-arrow-icon" />
            </span>
          </div>
        )}
      </button>
    </form>
  );
}
