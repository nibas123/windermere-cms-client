import { useState, useCallback } from 'react';
import { apiClient, Property, PropertyGalleryImage, Comment, User } from '@/lib/api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiActions<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  initialData: T | null = null
): [ApiState<T>, ApiActions<T>] {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  return [state, { execute, reset }];
}

// Auth hooks
export function useRegister() {
  return useApi(apiClient.register.bind(apiClient));
}

export function useLogin() {
  return useApi(apiClient.login.bind(apiClient));
}

export function useLogout() {
  return useApi(apiClient.logout.bind(apiClient));
}

export function useRequestPasswordReset() {
  return useApi(apiClient.requestPasswordReset.bind(apiClient));
}

export function useVerifyResetCode() {
  return useApi(apiClient.verifyResetCode.bind(apiClient));
}

export function useResetPassword() {
  return useApi(apiClient.resetPassword.bind(apiClient));
}

// Property hooks
export function useProperties() {
  return useApi(apiClient.getProperties.bind(apiClient), []);
}

export function useProperty(id: string) {
  return useApi(() => apiClient.getProperty(id), null);
}

export function useCreateProperty() {
  return useApi(apiClient.createProperty.bind(apiClient));
}

export function useUpdateProperty() {
  return useApi(apiClient.updateProperty.bind(apiClient));
}

export function useDeleteProperty() {
  return useApi(apiClient.deleteProperty.bind(apiClient));
}

// Gallery hooks
export function usePropertyGallery(propertyId: string) {
  return useApi(() => apiClient.getPropertyGallery(propertyId), []);
}

export function useUploadGalleryImages() {
  return useApi(apiClient.uploadGalleryImages.bind(apiClient));
}

export function useUploadFeaturedImages(){
  return useApi(apiClient.updateFeaturedImages.bind(apiClient));
}

export function useDeleteGalleryImage() {
  return useApi(apiClient.deleteGalleryImage.bind(apiClient));
}

export function useDeleteFeaturedImage(){
  return useApi(apiClient.deleteFeaturedGallery.bind(apiClient));
}

export function useUpdateGalleryImage() {
  return useApi(apiClient.updateGalleryImage.bind(apiClient));
}

// Comment hooks
export function useComments(params?: { status?: string; propertyId?: string }) {
  return useApi((filterParams?: { status?: string; propertyId?: string }) => {
    const finalParams = filterParams || params;
    return apiClient.getComments(finalParams);
  }, []);
}

export function useApproveComment() {
  return useApi(apiClient.approveComment.bind(apiClient));
}

export function useRejectComment() {
  return useApi(apiClient.rejectComment.bind(apiClient));
}

export function useReplyToComment() {
  return useApi(apiClient.replyToComment.bind(apiClient));
}

export function useDeleteComment() {
  return useApi(apiClient.deleteComment.bind(apiClient));
}

// Enquiry Booking hooks
export function useEnquiryBookings(params?: { status?: string; propertyId?: string }) {
  return useApi((filterParams?: { status?: string; propertyId?: string }) => {
    const finalParams = filterParams || params;
    return apiClient.getEnquiryBookings(finalParams);
  }, []);
}

export function useEnquiryBooking(id: string) {
  return useApi(() => apiClient.getEnquiryBooking(id), null);
}

export function useUpdateEnquiryBooking() {
  return useApi(apiClient.updateEnquiryBooking.bind(apiClient));
}

export function useDeleteEnquiryBooking() {
  return useApi(apiClient.deleteEnquiryBooking.bind(apiClient));
}

export function useEnquiryBookingsCount() {
  return useApi(apiClient.getEnquiryBookingsCount.bind(apiClient));
}

export function useConfirmEnquiryBooking() {
  return useApi(apiClient.confirmEnquiryBooking.bind(apiClient));
}

export function useCancelEnquiryBooking() {
  return useApi(apiClient.cancelEnquiryBooking.bind(apiClient));
}

// Visitor/Customer hooks
export function useVisitors() {
  return useApi(apiClient.getVisitors.bind(apiClient));
}

export function useVisitor(id: string) {
  return useApi(() => apiClient.getVisitor(id), null);
}

export function useCreateVisitor() {
  return useApi(apiClient.createVisitor.bind(apiClient));
}

export function useUpdateVisitor() {
  return useApi(apiClient.updateVisitor.bind(apiClient));
}

export function useDeleteVisitor() {
  return useApi(apiClient.deleteVisitor.bind(apiClient));
} 