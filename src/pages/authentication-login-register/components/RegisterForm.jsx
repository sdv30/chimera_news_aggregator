import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-error' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-warning' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const passwordStrength = getPasswordStrength(formData?.password);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={validationErrors?.fullName}
        required
        disabled={isLoading}
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={validationErrors?.email}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={validationErrors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
        
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    passwordStrength <= 2 ? 'bg-error' : 
                    passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${strengthInfo?.color}`}>
                {strengthInfo?.text}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={validationErrors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="acceptTerms"
        checked={formData?.acceptTerms}
        onChange={handleInputChange}
        error={validationErrors?.acceptTerms}
        required
        disabled={isLoading}
      />
      <Button
        type="submit"
        loading={isLoading}
        fullWidth
        className="mt-6"
      >
        Create Account
      </Button>
      <div className="bg-muted rounded-lg p-3 mt-4">
        <div className="flex items-start space-x-2">
          <Icon name="Mail" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Email Verification Required</p>
            <p className="text-xs text-muted-foreground mt-1">
              After registration, please check your email for a verification link to activate your account.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;